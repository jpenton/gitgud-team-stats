import { prisma, Prisma, Role, Player } from '../generated/prisma-client';
import xlsx from 'xlsx';
import path from 'path';

const cellRowAndColumn = async (text: string) => {
  let rowName: string = '';
  let colName: string = '';

  for (let i = 0; i < text.length; i++) {
    const num = parseInt(text[i], 10);

    if (Number.isNaN(num)) {
      colName += text[i];
    } else {
      rowName += text[i];
    }
  }

  return {
    column: colName,
    row: parseInt(rowName, 10),
  };
};

const roleToEnum = (text: string): Role => {
  switch (text) {
    case 'Main Tank':
      return 'MAIN_TANK';
    case 'Off Tank':
      return 'OFF_TANK';
    case 'Hitspan DPS':
      return 'HITSCAN_DPS';
    case 'Projectile DPS':
      return 'PROJECTILE_DPS';
    case 'Main Support':
      return 'MAIN_SUPPORT';
    case 'Flex Support':
      return 'FLEX_SUPPORT';
    case 'Manager':
      return 'MANAGER';
    case 'Sub 1':
    case 'Sub 2':
      return 'SUB';
    default:
      return 'PLAYER';
  }
};

const main = async () => {
  const workbook = xlsx.readFile(path.resolve(__dirname, './data.xlsx'));
  const rows: Record<string, string[]> = {};

  for (const key of Object.keys(workbook.Sheets.data)) {
    if (key === '!ref') {
      continue;
    }

    const cell = await cellRowAndColumn(key);

    if (Number.isNaN(cell.row)) {
      continue;
    }

    if (!rows[cell.row]) {
      rows[cell.row] = [];
    }

    rows[cell.row].push(workbook.Sheets.data[key].v);
  }

  const teams: Record<string, string[][]> = {};

  for (const row of Object.values(rows)) {
    if (!teams[row[0]]) {
      teams[row[0]] = [];
    }

    teams[row[0]].push(row.slice(1));
  }

  for (const teamName of Object.keys(teams)) {
    const playersData = teams[teamName];
    const players = await Promise.all(
      playersData.map(player =>
        (prisma as Prisma).createPlayer({
          discord: player[0],
          role: roleToEnum(player[1]),
          bnet: player[2],
        }),
      ),
    );

    let manager: Player | undefined;
    const managerData = playersData.find(i => i.includes('manager'));
    let assistantManager: Player | undefined;
    const assistantManagerData = playersData.find(i =>
      i.includes('assistant manager'),
    );

    if (managerData) {
      manager = players.find(i => i.discord === managerData[0]);
    }

    if (assistantManagerData) {
      assistantManager = players.find(
        i => i.discord === assistantManagerData[0],
      );
    }

    await (prisma as Prisma).createTeam({
      assistant_manager: assistantManager
        ? {
            connect: {
              id: assistantManager.id,
            },
          }
        : null,
      manager: {
        connect: {
          id: (manager as Player).id,
        },
      },
      name: teamName,
      players: {
        connect: players.map(({ id }) => ({ id })),
      },
    });
  }
};

main();
