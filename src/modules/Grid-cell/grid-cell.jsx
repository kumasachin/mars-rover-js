import React from 'react';
import { useMarsContextAPI } from '../../context/marsContext';
import { ReactComponent as Robot } from '../../assets/icon/robot.svg';
import './grid-cell.css';

const GridCell = ({ rowIndex, cellCount }) => {
  const { map, robots } = useMarsContextAPI();

  const robotCell = () => (
    <span key={`robot-${rowIndex}`} className="robot">
      <Robot />
    </span>
  );

  const renderColumn = () => {
    let columns = [];
    for (let index = 0; index < cellCount; index++) {
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
  };

  return <>{renderColumn()}</>;
};

export default GridCell;
