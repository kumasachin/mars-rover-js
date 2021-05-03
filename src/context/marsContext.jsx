import React, { useContext, useState, useEffect, createContext } from 'react';
import { responseTemplate } from '../utils/robo-utils';
const MarsContext = createContext();

export const MarsContextProvider = ({ children, data = null }) => {
  const [response, setResponse] = useState(null);
  const updateRobotData = (updatedRobot) => {
    setResponse(updatedRobot);
  };
  useEffect(() => {
    if (data) {
      const formatdata = () => {
        const modifiedData = data.map((robotData) =>
          responseTemplate(robotData)
        );
        const gridArray = modifiedData[0].grid.split(' ');
        setResponse({
          dimension: gridArray,
          robots: modifiedData,
          updateRobotData: updateRobotData,
        });
      };

      formatdata();
    }
  }, [data]);

  return (
    <MarsContext.Provider value={response}>{children}</MarsContext.Provider>
  );
};

export const useMarsContextAPI = () => {
  const context = useContext(MarsContext);
  if (context === undefined) {
    throw new Error('Context must be used within a Provider');
  }
  return context;
};
