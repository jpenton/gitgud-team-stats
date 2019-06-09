import { WorkSheet } from 'xlsx/types';

const sheetToRows = (sheet: WorkSheet): string[][] => {
  let currRow: string = '1';
  const rows: string[][] = [];
  let row: string[] = [];

  for (const key of Object.keys(sheet)) {
    let colName: string | undefined;
    let rowName: string | undefined;

    let regex = /\D+/g.exec(key);

    if (regex) {
      colName = regex[0];
    }

    regex = /\d+/g.exec(key);

    if (regex) {
      rowName = regex[0];
    }

    if (!(colName && rowName)) {
      continue;
    } else if (rowName !== currRow) {
      rows.push(row);
      row = [];
      currRow = rowName;
    }

    row.push(sheet[key].v);
  }

  return [...rows, row];
};

export default sheetToRows;
