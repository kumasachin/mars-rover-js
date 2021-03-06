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
          dimension: {
            xaxis: parseInt(gridArray[0]),
            yaxis: parseInt(gridArray[1]),
          },
          robots: modifiedData,
          updateRobotData: updateRobotData,
          lostCell: [{}],
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
