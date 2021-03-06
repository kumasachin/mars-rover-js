import React, { useState, useEffect } from 'react';
import { useMarsContextAPI } from '../../context/marsContext';
import { robotNextStep } from '../../utils/robo-utils';
import { delay } from '../../utils/common-utils';
import { GridRow } from '../';
import './grid.css';

export const Grid = () => {
  const marsData = useMarsContextAPI();
  const { dimension, robots, updateRobotData, lostCell } = marsData;
  const [robotList, setRobotNewPosition] = useState(robots);
  const [iteratorForRobot, setInstructionStatus] = useState({
    instructionCount: 0,
    queueOfRobot: 0,
  });

  const updateRobotsList = (robotWithNewPosition) => {
    const robotListUpdated = [...robotList];
    robotListUpdated[iteratorForRobot.queueOfRobot] = robotWithNewPosition;
    return robotListUpdated;
  };

  const detectRobotNextInstruction = (robotToMove) => {
    const { queueOfRobot, instructionCount } = iteratorForRobot;
    if (
      robotList.length - 1 >= queueOfRobot &&
      robotToMove.instructions.length >= instructionCount
    ) {
      return robotToMove.instructions[instructionCount];
    }
    return null;
  };

  const pickRobotToMove = () => {
    const { queueOfRobot } = iteratorForRobot;
    return robotList[queueOfRobot];
  };

  const passInstruction = (robot, nextInstruction) => {
    const robotWithNewPosition = robotNextStep({
      robotToMove: robot,
      nextInstruction: nextInstruction,
      dimension: dimension,
      lostCell: lostCell,
    });

    return robotWithNewPosition;
  };

  const moveRobot = async () => {
    const robot = pickRobotToMove();
    const { queueOfRobot, instructionCount } = iteratorForRobot;
    const nextInstruction = detectRobotNextInstruction(robot);
    const robotWithInstruction = passInstruction(robot, nextInstruction);
    const robotListUpdated = updateRobotsList(robotWithInstruction);
    if (queueOfRobot === 0 && instructionCount === 0) {
      await delay(1700);
    }
    if (
      nextInstruction === null ||
      robotWithInstruction.lost ||
      robotWithInstruction.isOnEdge
    ) {
      setInstructionStatus({
        instructionCount: 0,
        queueOfRobot:
          robotList.length > queueOfRobot ? queueOfRobot + 1 : queueOfRobot,
      });
    } else {
      setInstructionStatus({
        instructionCount: instructionCount + 1,
        queueOfRobot: queueOfRobot,
      });
    }
    await delay(300);
    updateRobotData({
      ...marsData,
      robots: [...robotListUpdated],
    });
  };

  useEffect(() => {
    if (robots && iteratorForRobot.queueOfRobot < robotList.length) {
      moveRobot();
    }
  }, [robotList]);

  useEffect(() => {
    setRobotNewPosition(robots);
  }, [robots]);

  return (
    <table
      cellSpacing="0"
      border="1"
      width="100%"
      height="100%"
      className="grid-container"
    >
      <tbody>
        <GridRow whichRoboToMove={iteratorForRobot.queueOfRobot} />
      </tbody>
    </table>
  );
};

export default Grid;
