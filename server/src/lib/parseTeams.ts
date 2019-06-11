import axios from 'axios';
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
} from '../../generated/prisma-client';
import slug from 'slug';
import cheerio from 'cheerio';
import puppeteer from 'puppeteer';

const parseTeams = async (prisma: Prisma) => {
  const { data } = await axios.get(
    'https://docs.google.com/spreadsheets/d/1DhtqAhu6PiAzeq87_5s0WchYvEADkBFoKpISpPugLJw/export?format=csv&id=1DhtqAhu6PiAzeq87_5s0WchYvEADkBFoKpISpPugLJw&gid=1325593297',
  );
  const workbook = xlsx.read(data, {
    type: 'string',
    raw: true,
  });

  const rows = sheetToRows(workbook.Sheets['Sheet1']).slice(2);
  interface ITeam {
    name: string;
    players: IPlayer[];
  }
  interface IPlayer {
    discord: string;
    role: string;
    bnet: string;
  }
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
          name: filteredName, // Remove "Team # - "
          players: players
            .filter(i => i.length >= 3 && i[1] !== 'Manager')
            .map(([discord, role, bnet], index) => ({
              discord,
              role: role.startsWith('Player') && index > 5 ? 'Sub' : role,
              bnet,
            })),
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
    const players = teams[i].players.map(i => {
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

      return {
        bnet: i.bnet,
        discord: i.discord,
        role,
      };
    });

    for (let j = 0; j < players.length; j++) {
      let player = await prisma.player({
        bnet: players[j].bnet,
      });

      if (!player) {
        player = await prisma.createPlayer(players[j]);
      }

      const { data } = await axios.get(
        'https://playoverwatch.com/en-us/career/pc/' +
          encodeURIComponent(players[j].bnet.replace('#', '-')),
      );
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
        name: teams[i].name,
        players: {
          connect: players.map(i => ({
            bnet: i.bnet,
          })),
        },
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
              bnet: i.bnet,
            })),
          },
        },
        where: {
          slug: teams[i].slug,
        },
      });
    }
  }

  const browser = await puppeteer.launch();
  const [page] = await browser.pages();

  await page.goto('https://challonge.com/GGNA_S3_BGN');
  await page.waitForSelector(
    'div.group:nth-child(1) > ul:nth-child(1) > li:nth-child(1)',
  );

  const teamsData = await page.evaluate(() => {
    const names = document.querySelectorAll(
      'div.group > div:nth-child(2) > div:nth-child(1) > table:nth-child(1) > tbody:nth-child(2) > tr > td:nth-child(2)',
    );
    const WLT = document.querySelectorAll(
      'div.group > div:nth-child(2) > div:nth-child(1) > table:nth-child(1) > tbody:nth-child(2) > tr > td:nth-child(3)',
    );
    const pointDifference = document.querySelectorAll(
      'div.group > div:nth-child(2) > div:nth-child(1) > table:nth-child(1) > tbody:nth-child(2) > tr > td:nth-child(4)',
    );

    return Array.from(names).map((el, index) => ({
      name: el.textContent as string,
      wlt: WLT[index].textContent as string,
      pd: pointDifference[index].textContent as string,
    }));
  });

  await browser.close();

  for (const teamData of teamsData) {
    const team = await prisma.team({
      slug: slug(teamData.name.trim().toLowerCase()),
    });

    if (!team) {
      continue;
    }

    const [wins, losses, ties] = teamData.wlt.split(' - ').map(Number);
    const pd = Number(teamData.pd);

    await prisma.updateTeam({
      where: {
        slug: team.slug,
      },
      data: {
        wins,
        losses,
        ties,
        pointDifference: pd,
      },
    });
  }
};

export default parseTeams;
