import React from 'react';
import { useMarsContextAPI } from '../../context/marsContext';
import { GridCell } from '../';
import './grid-row.css';

export const GridRow = ({ whichRoboToMove }) => {
  const { dimension, robots } = useMarsContextAPI();
  const { xaxis, yaxis } = dimension;
  const findRoboInRow = (rowNumber, typeOfCoordinates) => {
    const allRobots = robots.filter((robot, index) => {
      return whichRoboToMove >= index && rowNumber === robot[typeOfCoordinates];
    });

    return allRobots;
  };

  const renderRows = () => {
    let rows = [];
    for (let index = yaxis - 1; index >= 0; index--) {
      const isRobotExitOnRow = findRoboInRow(index, 'yaxis');

      rows.push(
        <tr key={`row-${index}`} className={`grid-row row-${index}`}>
          <GridCell
            rowIndex={index}
            cellCount={xaxis}
            isRobotExitOnRow={isRobotExitOnRow}
            whichRoboToMove={whichRoboToMove}
          />
        </tr>
      );
    }
    return rows;
  };

  return <>{renderRows()}</>;
};

export default GridRow;
