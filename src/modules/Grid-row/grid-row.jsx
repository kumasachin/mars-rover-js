import React from 'react';
import { useMarsContextAPI } from '../../context/marsContext';
import { GridCell } from '../';
import './grid-row.css';

export const GridRow = ({ whichRoboToMove }) => {
  const { dimension, robots } = useMarsContextAPI();
  const yaxis = parseInt(dimension[1]);
  const xaxis = parseInt(dimension[0]);
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
      const roboClass = isRobotExitOnRow && 'robo-row';

      rows.push(
        <tr
          key={`row-${index}`}
          className={`grid-row row-${index} ${roboClass}`}
        >
          <GridCell
            rowIndex={index}
            cellCount={xaxis}
            isRobotExitOnRow={isRobotExitOnRow}
          />
        </tr>
      );
    }
    return rows;
  };

  return <>{renderRows()}</>;
};

export default GridRow;
