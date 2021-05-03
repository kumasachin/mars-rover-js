import React from 'react';
import { useMarsContextAPI } from '../../context/marsContext';
import { ReactComponent as Robot } from '../../assets/icon/robot.svg';
import './grid-cell.css';

const GridCell = ({ rowIndex, whichRoboToMove }) => {
  const { dimension, robots } = useMarsContextAPI();
  const robotCell = (allRobotInCell) =>
    allRobotInCell.map((robot, index) => (
      <span
        key={`robot-${robot.name}-${index}`}
        className={`robot ${robot.direction}`}
      >
        <Robot />
        {robot.name}
      </span>
    ));

  const renderColumn = () => {
    let columns = [];
    for (let index = 0; index < dimension.xaxis; index++) {
      const allRobotInCell = robots.filter((robot, seq) => {
        return (
          whichRoboToMove >= seq &&
          robot.yaxis === rowIndex &&
          robot.xaxis === index
        );
      });

      columns.push(
        <td
          key={`cell-${rowIndex}-${index}`}
          className={`grid-column column-${index}`}
        >
          {allRobotInCell.length > 0 ? robotCell(allRobotInCell) : <span />}
        </td>
      );
    }

    return columns;
  };

  return <>{renderColumn()}</>;
};

export default GridCell;
