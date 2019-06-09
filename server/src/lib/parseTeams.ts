import axios from 'axios';
import xlsx from 'xlsx';
import sheetToRows from './sheetToRows';
import { Role, Prisma } from '../../generated/prisma-client';

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
  const teams: ITeam[] = [];
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
        teams.push({
          name,
          players: players
            .filter(i => i.length >= 3 && i[1] !== 'Manager')
            .map(([discord, role, bnet]) => ({
              discord,
              role,
              bnet,
            })),
        });
      }
      tempRows = [];
    }

    tempRows.push(rows[i]);
  }

  for (let i = 0; i < teams.length; i++) {
    const team = await prisma.team({
      name: teams[i].name,
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
      const player = await prisma.player({
        bnet: players[j].bnet,
      });

      if (!player) {
        await prisma.createPlayer(players[j]);
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
      });
    } else {
      await prisma.updateTeam({
        data: {
          players: {
            connect: players.map(i => ({
              bnet: i.bnet,
            })),
          },
        },
        where: {
          name: teams[i].name,
        },
      });
    }
  }
};

export default parseTeams;
