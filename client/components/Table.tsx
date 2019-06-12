import * as React from 'react';

interface IProps {
  headers: string[];
  rows: React.ReactNode[][];
}

const Table: React.FC<IProps> = ({ headers, rows }) => {
  return (
    <div className="overflow-x-auto shadow-lg rounded-lg">
      <table>
        <tbody>
          <tr>
            {headers.map(i => (
              <th key={i}>{i}</th>
            ))}
          </tr>
          {rows.map((i, index) => (
            <tr key={index}>
              {i.map((j, index) => (
                <td key={index}>{j}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
