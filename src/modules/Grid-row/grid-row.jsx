import React from 'react';
import { useMarsContextAPI } from '../../context/marsContext';
import { GridCell } from '../';
import './grid-row.css';

export const GridRow = () => {
  const data = useMarsContextAPI();
  const axis = data[0].grid.split(' ');
  const yaxis = parseInt(axis[1]);
  const xaxis = parseInt(axis[0]);
  const renderRows = () => {
    let rows = [];
    for (let index = yaxis - 1; index >= 0; index--) {
      rows.push(
        <tr key={`row-${index}`} className={`grid-row row-${index} `}>
          <GridCell rowIndex={index} cellCount={xaxis} />
        </tr>
      );
    }
    return rows;
  };

  return <>{renderRows()}</>;
};

export default GridRow;
