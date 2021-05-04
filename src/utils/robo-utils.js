import CONFIG from '../config/';

/*
Method to modify csv reponse to expected json structure
*/
export const responseTemplate = (robot) => {
  if (robot.movements) {
    return robot;
  }
  const positionAndMovements = robot.movement.split('|');
  const postionArray = positionAndMovements[0].split(' ');
  const movements = positionAndMovements[1];
  const position = {
    xaxis: parseInt(postionArray[0]),
    yaxis: parseInt(postionArray[1]),
    direction: postionArray[2],
  };

  return {
    ...robot,
    ...position,
    instructions: movements,
  };
};

/*
 Method to take action on robot next step
 */
export const robotNextStep = ({
  robotToMove,
  nextInstruction,
  dimension,
  lostCell,
}) => {
  let robotWithNewPosition = {
    ...robotToMove,
  };

  //Private method to do front move
  const frontMove = () => {
    let robotNewDetails = { ...robotWithNewPosition };
    const { direction } = robotNewDetails;

    //Reset value set by above if robot is lost
    robotNewDetails = checkIfRobotIsLost({
      dimension: dimension,
      axis: CONFIG.FRONT[direction],
      direction: direction,
      robotNewDetails: { ...robotNewDetails },
      lostCell: lostCell,
    });

    return robotNewDetails;
  };

  if (nextInstruction === 'L') {
    robotWithNewPosition.direction =
      CONFIG.LEFT[robotWithNewPosition.direction];
  } else if (nextInstruction === 'R') {
    robotWithNewPosition.direction =
      CONFIG.RIGHT[robotWithNewPosition.direction];
  } else if (nextInstruction === 'M') {
    const newPositionWithDirection = frontMove();
    robotWithNewPosition = {
      ...robotWithNewPosition,
      ...newPositionWithDirection,
    };
  }

  return robotWithNewPosition;
};

export const checkIfRobotIsLost = (args) => {
  const { dimension, axis, direction, robotNewDetails } = args;
  if (dimension[axis] > robotNewDetails[axis] && robotNewDetails[axis] >= 0) {
    // const noLostCell = checkCurrentIsNoLostCell(args);

    // Set next steps for robot
    if (direction === 'N' || direction === 'E') {
      robotNewDetails[axis] = robotNewDetails[axis] + 1;
    } else if (direction === 'S' || direction === 'W') {
      robotNewDetails[axis] = robotNewDetails[axis] - 1;
    }
    // Check if robot is out of grid after moving
    if (dimension[axis] <= robotNewDetails[axis] || robotNewDetails[axis] < 0) {
      const lostRobot = {
        ...robotNewDetails,
        lost: {
          xaxis: robotNewDetails.xaxis,
          yaxis: robotNewDetails.yaxis,
        },
      };

      // log the scent
      if (direction === 'N' || direction === 'E') {
        lostRobot.lost[axis] = robotNewDetails[axis] - 1;
      } else if (direction === 'S' || direction === 'W') {
        lostRobot.lost[axis] = robotNewDetails[axis] + 1;
      }

      return lostRobot;
    }
  }

  return robotNewDetails;
};
