import axios, { AxiosPromise, AxiosRequestConfig, AxiosResponse } from 'axios';
import xlsx from 'xlsx';
import sheetToRows from './sheetToRows';
import {
  Role,
  Prisma,
  Team,
  Player,
  TeamCreateInput,
  PlayerCreateInput,
  PlayerCreateWithoutTeamInput,
  PlayerCreateManyWithoutTeamInput,
  Division,
  Region,
} from '../../generated/prisma-client';
import slug from 'slug';
import cheerio from 'cheerio';
import _ from 'lodash';

const divisions: {
  bracket: string;
  name: Division;
  region: Region;
  sheet: string;
}[] = [
  {
    bracket: 'https://challonge.com/GGNA_S3_BGN',
    region: 'NA',
    name: 'BEGINNER',
    sheet:
      'https://docs.google.com/spreadsheets/d/1DhtqAhu6PiAzeq87_5s0WchYvEADkBFoKpISpPugLJw/export?format=csv&id=1DhtqAhu6PiAzeq87_5s0WchYvEADkBFoKpISpPugLJw&gid=1325593297',
  },
  {
    bracket: 'https://challonge.com/GGNA_S3_ROOK',
    region: 'NA',
    name: 'ROOKIE',
    sheet:
      'https://docs.google.com/spreadsheets/d/1DhtqAhu6PiAzeq87_5s0WchYvEADkBFoKpISpPugLJw/export?format=csv&id=1DhtqAhu6PiAzeq87_5s0WchYvEADkBFoKpISpPugLJw&gid=549246776',
  },
  {
    bracket: 'https://challonge.com/GGNA_S3_INT',
    region: 'NA',
    name: 'INTERMEDIATE',
    sheet:
      'https://docs.google.com/spreadsheets/d/1DhtqAhu6PiAzeq87_5s0WchYvEADkBFoKpISpPugLJw/export?format=csv&id=1DhtqAhu6PiAzeq87_5s0WchYvEADkBFoKpISpPugLJw&gid=2028194262',
  },
  {
    bracket: 'https://challonge.com/GGNA_S3_ADV',
    region: 'NA',
    name: 'ADVANCED',
    sheet:
      'https://docs.google.com/spreadsheets/d/1DhtqAhu6PiAzeq87_5s0WchYvEADkBFoKpISpPugLJw/export?format=csv&id=1DhtqAhu6PiAzeq87_5s0WchYvEADkBFoKpISpPugLJw&gid=1429385219',
  },
  {
    bracket: 'https://challonge.com/GGNA_S3_EXP',
    region: 'NA',
    name: 'EXPERT',
    sheet:
      'https://docs.google.com/spreadsheets/d/1DhtqAhu6PiAzeq87_5s0WchYvEADkBFoKpISpPugLJw/export?format=csv&id=1DhtqAhu6PiAzeq87_5s0WchYvEADkBFoKpISpPugLJw&gid=591479819',
  },
];

const parseTeams = async (prisma: Prisma) => {
  for (const division of divisions) {
    console.log(
      `${new Date().toISOString()} Starting ${division.region} ${
        division.name
      } team parsing...`,
    );

    const { data } = await axios.get(division.sheet);
    const workbook = xlsx.read(data, {
      type: 'string',
      raw: true,
    });

    const rows = sheetToRows(workbook.Sheets['Sheet1']).slice(2);
    const teams: Array<
      Omit<TeamCreateInput, 'players'> & {
        players: Array<
          Omit<PlayerCreateWithoutTeamInput, 'role'> & { role: string }
        >;
      }
    > = [];
    let tempRows: string[][] = [];

    for (let i = 0; i < rows.length + 1; i++) {
      if (
        (rows[i] === undefined ||
          (rows[i].length === 1 &&
            !/(Player\s+\d+|Sub\s+\d+|Main Tank|Main Support|Hitscan|Projectile|Flex Support|Off Tank)/g.exec(
              String(rows[i][0]),
            ))) &&
        tempRows.length !== 0
      ) {
        const [[name], _, ...players] = tempRows;

        if (!players.find(i => i.includes('Yes'))) {
          const filteredName = name.replace(/\w+\s\d+\s-\s/g, '');
          teams.push({
            division: division.name,
            name: filteredName, // Remove "Team # - "
            players: players
              .filter(i => i.length >= 3 && !i[1].includes('Manager'))
              .map(([discord, role, bnet], index) => ({
                discord,
                role: role.startsWith('Player') && index > 5 ? 'Sub' : role,
                bnet,
              })),
            region: division.region,
            slug: slug(filteredName.toLowerCase()),
          });
        }
        tempRows = [];
      }

      tempRows.push(rows[i]);
    }

    for (let i = 0; i < teams.length; i++) {
      const team = await prisma.team({
        slug: teams[i].slug,
      });
      const players = await Promise.all(
        teams[i].players.map(async i => {
          let [player] = await prisma.players({
            where: {
              bnet: i.bnet,
              discord: i.discord,
            },
          });

          if (!player) {
            let role: Role | undefined;

            switch (i.role) {
              case 'Main Tank':
                role = 'MAIN_TANK';
                break;
              case 'Off Tank':
                role = 'OFF_TANK';
                break;
              case 'Projectile':
                role = 'PROJECTILE_DPS';
                break;
              case 'Hitscan':
                role = 'HITSCAN_DPS';
                break;
              case 'Main Support':
                role = 'MAIN_SUPPORT';
                break;
              case 'Flex Support':
                role = 'FLEX_SUPPORT';
                break;
              case 'Flex':
                role = 'FLEX';
                break;
              default: {
                if (i.role.startsWith('Player')) {
                  role = 'PLAYER';
                  break;
                } else if (i.role.startsWith('Sub')) {
                  role = 'SUB';
                }
              }
            }

            if (!role) {
              throw new Error('No role found');
            }

            player = await prisma.createPlayer({
              bnet: i.bnet,
              discord: i.discord,
              role,
            });
          }

          return player;
        }),
      );

      const playerPages = await Promise.all(
        players.map(i =>
          axios.get(
            'https://playoverwatch.com/en-us/career/pc/' +
              encodeURIComponent(i.bnet.replace('#', '-')),
          ),
        ),
      );

      for (const player of players) {
        const { data } = playerPages.splice(0, 1)[0];
        const $ = cheerio.load(data);
        const rank = $(
          'div.masthead-player-progression:nth-child(3) > div:nth-child(3) > div:nth-child(2)',
        ).text();
        const nRank = parseInt(rank, 10);

        if (!Number.isNaN(nRank)) {
          await prisma.updatePlayer({
            where: {
              id: player.id,
            },
            data: {
              sr: nRank,
            },
          });
        }
      }

      if (!team) {
        await prisma.createTeam({
          division: division.name,
          name: teams[i].name,
          players: {
            connect: players.map(i => ({
              id: i.id,
            })),
          },
          region: division.region,
          slug: teams[i].slug,
        });
      } else {
        const teamPlayers = await prisma
          .team({
            slug: teams[i].slug,
          })
          .players();
        await prisma.updateTeam({
          where: {
            slug: teams[i].slug,
          },
          data: {
            players: {
              disconnect: teamPlayers.map(({ id }) => ({ id })),
            },
          },
        });
        await prisma.updateTeam({
          data: {
            players: {
              connect: players.map(i => ({
                id: i.id,
              })),
            },
          },
          where: {
            slug: teams[i].slug,
          },
        });
      }
    }

    const { data: bracketData } = await axios.get(division.bracket);
    let $ = cheerio.load(bracketData);
    const standingsData = $('.full-screen-target > script:nth-child(1)').html();
    const startText = `window._initialStoreState['TournamentStore'] = `;
    const endText = `};`;

    if (!standingsData) {
      return;
    }

    const startIndex = standingsData.indexOf(startText) + startText.length;
    let standings = standingsData.slice(startIndex);
    const endIndex = standings.indexOf(endText) + endText.length - 1;
    standings = JSON.parse(standings.slice(0, endIndex))['groups'].map(
      (i: any) =>
        i['scorecard_html'].replace('\u003c', '<').replace('\u003e', '>'),
    );
    const teamsData = [];

    for (const html of standings) {
      $ = cheerio.load(html);
      const names = Array.from(
        $('table:nth-child(1) > tbody:nth-child(2) > tr > td:nth-child(2)'),
      ).map(i => i.children[0].data);
      const wlt = Array.from(
        $('table:nth-child(1) > tbody:nth-child(2) > tr > td:nth-child(3)'),
      ).map(i => i.children[0].data);
      const pointDifference = Array.from(
        $('table:nth-child(1) > tbody:nth-child(2) > tr > td:nth-child(4)'),
      ).map(i => i.children[0].data);
      const tieBreakersWon = Array.from(
        $('table:nth-child(1) > tbody:nth-child(2) > tr > td:nth-child(5)'),
      ).map(i => i.children[0].data);
      const setWins = Array.from(
        $('table:nth-child(1) > tbody:nth-child(2) > tr > td:nth-child(7)'),
      ).map(i => i.children[0].data);

      teamsData.push(
        ...names.map((name, index) => ({
          name: name as string,
          wlt: wlt[index] as string,
          pd: pointDifference[index] as string,
          tieBreakersWon: tieBreakersWon[index] as string,
          setWins: setWins[index] as string,
        })),
      );
    }

    for (const teamData of teamsData) {
      const team = await prisma.team({
        slug: slug(teamData.name.trim().toLowerCase()),
      });

      if (!team) {
        continue;
      }

      const [wins, losses, ties] = teamData.wlt.split(' - ').map(Number);
      const pd = Number(teamData.pd);
      const tieBreakersWon = Number(teamData.tieBreakersWon);
      const setWins = Number(teamData.setWins);

      await prisma.updateTeam({
        where: {
          slug: team.slug,
        },
        data: {
          wins,
          losses,
          ties,
          pointDifference: pd,
          tieBreakersWon,
          setWins,
        },
      });
    }

    console.log(
      `${new Date().toISOString()} Done with ${division.region} ${
        division.name
      } team parsing.`,
    );
  }
};

export default parseTeams;
