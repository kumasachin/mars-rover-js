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
    movements: movements,
  };
};

export default {
  responseTemplate,
};
