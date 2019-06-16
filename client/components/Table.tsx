import * as React from 'react';
import classnames from 'classnames';

interface IProps {
  dashedIndex?: number;
  headers: string[];
  numbered?: boolean;
  rows: IRow[];
}

interface IRow {
  content: React.ReactNode[];
  red?: boolean;
  yellow?: boolean;
}

const Table: React.FC<IProps> = ({ dashedIndex, headers, numbered, rows }) => {
  return (
    <div className="overflow-x-auto shadow-lg rounded-lg">
      <table>
        <tbody>
          <tr>
            {numbered ? (
              <th className="text-right hover:text-right collapse-cell">#</th>
            ) : null}
            {headers.map(i => (
              <th key={i}>{i}</th>
            ))}
          </tr>
          {rows.map((row, rowIndex) => (
            <tr
              className={classnames({
                'row-red': row.red,
                'row-yellow': row.yellow,
                'border-dashed border-cool-grey-200': dashedIndex === rowIndex,
              })}
              key={rowIndex}
            >
              {numbered ? (
                <td className="text-right collapse-cell">{rowIndex + 1}</td>
              ) : null}
              {row.content.map((cell, cellIndex) => (
                <td key={cellIndex}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
