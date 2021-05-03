import React from 'react';
import { useMarsContextAPI } from '../../context/marsContext';
import { ReactComponent as Robot } from '../../assets/icon/robot.svg';
import './grid-cell.css';

const GridCell = ({ rowIndex }) => {
  const { map, robots } = useMarsContextAPI();

  const robotCell = () => (
    <span key={`robot-${rowIndex}`}>
      <Robot />
    </span>
  );

  const renderColumn = () => {
    try {
      let columns = [];
      for (let index = 0; index < map.x; index++) {
        columns.push(
          <td
            key={`cell-${rowIndex}-${index}`}
            className={`grid-column column-${index}`}
          >
            {robotCell()}
          </td>
        );
      }

      return columns;
    } catch (e) {
      console.log('unknow error while rendering grid columns');
    }
  };

  return <>{renderColumn()}</>;
};

export default GridCell;
