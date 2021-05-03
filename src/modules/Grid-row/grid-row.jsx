import React from 'react';
import { useMarsContextAPI } from '../../context/marsContext';
import { GridCell } from '../';
import './grid-row.css';

export const GridRow = () => {
  const data = useMarsContextAPI();
  const axis = data[0].grid.split(' ');
  const yaxis = parseInt(axis[1]);
  const renderRows = () => {
    try {
      let rows = [];

      for (let index = yaxis - 1; index >= 0; index--) {
        rows.push(
          <tr key={`row-${index}`} className={`grid-row row-${index} `}>
            <GridCell rowIndex={index} />
          </tr>
        );
      }
      return rows;
    } catch (e) {
      console.log('unknow error while rendering grid rows');
    }
  };

  return <>{renderRows()}</>;
};

export default GridRow;
