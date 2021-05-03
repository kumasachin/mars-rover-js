import CONFIG from '../config/';

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

export const robotNextStep = ({
  robotToMove,
  nextInstruction,
  dimension,
  lostCell,
}) => {
  let robotWithNewPosition = {
    ...robotToMove,
  };

  const frontMove = () => {
    let robotNewDetails = { ...robotWithNewPosition };
    const { direction } = robotNewDetails;

    switch (direction) {
      case 'N':
        if (
          checkCurrentIsNoLostCell(
            lostCell,
            'yaxis',
            direction,
            robotNewDetails,
            dimension
          )
        ) {
          robotNewDetails.yaxis = robotNewDetails.yaxis + 1;
        } else {
          robotNewDetails.isOnEdge = true;
        }

        break;
      case 'S':
        if (
          checkCurrentIsNoLostCell(
            lostCell,
            'yaxis',
            direction,
            robotNewDetails,
            dimension
          )
        ) {
          robotNewDetails.yaxis = robotNewDetails.yaxis - 1;
        } else {
          robotNewDetails.isOnEdge = true;
        }
        break;
      case 'E':
        if (
          checkCurrentIsNoLostCell(
            lostCell,
            'xaxis',
            direction,
            robotNewDetails,
            dimension
          )
        ) {
          robotNewDetails.xaxis = robotNewDetails.xaxis + 1;
        } else {
          robotNewDetails.isOnEdge = true;
        }
        break;
      case 'W':
        if (
          checkCurrentIsNoLostCell(
            lostCell,
            'xaxis',
            direction,
            robotNewDetails,
            dimension
          )
        ) {
          robotNewDetails.xaxis = robotNewDetails.xaxis - 1;
        } else {
          robotNewDetails.isOnEdge = true;
        }

        break;
      default:
      // code block
    }

    //Reset value set by above if robot is lost
    robotNewDetails = checkIfRobotIsLost({
      dimension: dimension,
      axis: CONFIG.FRONT[direction],
      direction: direction,
      robotNewDetails: robotNewDetails,
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
    // const newPositionWithDirection = frontMove();
    // robotWithNewPosition = {
    //   ...robotWithNewPosition,
    //   ...newPositionWithDirection,
    // };
  }

  return robotWithNewPosition;
};

const checkCurrentIsNoLostCell = (
  lostCell,
  axis,
  direction,
  robotNewDetails,
  dimension
) => {
  const scentFound =
    lostCell['xaxis'].includes(robotNewDetails['xaxis']) &&
    lostCell['yaxis'].includes(robotNewDetails['yaxis']);
  const isRobotOnEdge =
    dimension[axis] - 1 === robotNewDetails[axis] ||
    robotNewDetails[axis] === 0;

  if (scentFound && isRobotOnEdge) {
    if (direction === 'N' || direction === 'E') {
      return dimension[axis] > robotNewDetails[axis] + 1;
    } else if (direction === 'S' || direction === 'W') {
      return dimension[axis] < robotNewDetails[axis] - 1;
    }
    return false;
  }

  return true;
};

const checkIfRobotIsLost = ({
  dimension,
  axis,
  direction,
  robotNewDetails,
}) => {
  if (dimension[axis] <= robotNewDetails[axis] || robotNewDetails[axis] < 0) {
    const lostRobot = {
      ...robotNewDetails,
      lost: {
        x: robotNewDetails.x,
        y: robotNewDetails.y,
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

  return robotNewDetails;
};

export default {
  responseTemplate,
  checkIfRobotIsLost,
  checkCurrentIsNoLostCell,
  robotNextStep,
};
