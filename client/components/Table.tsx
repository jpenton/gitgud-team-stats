import * as React from 'react';
import classnames from 'classnames';

interface IProps {
  dashedIndex?: number;
  headers: string[];
  rows: IRow[];
}

interface IRow {
  content: React.ReactNode[];
  red?: boolean;
  yellow?: boolean;
}

const Table: React.FC<IProps> = ({ dashedIndex, headers, rows }) => {
  return (
    <div className="overflow-x-auto shadow-lg rounded-lg">
      <table>
        <tbody>
          <tr>
            {headers.map(i => (
              <th key={i}>{i}</th>
            ))}
          </tr>
          {rows.map((row, index) => (
            <tr
              className={classnames({
                'row-red': row.red,
                'row-yellow': row.yellow && !row.red,
                'border-dashed border-cool-grey-200': dashedIndex === index,
              })}
              key={index}
            >
              {row.content.map((cell, index) => (
                <td key={index}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
