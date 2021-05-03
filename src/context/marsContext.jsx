import React, { useContext, useState, useEffect, createContext } from 'react';
import { CONFIG } from '../config/index';
import { responseTemplate } from '../utils/robo-utils';
const MarsContext = createContext();

export const MarsContextProvider = ({ children, data = null }) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (data) {
      const formatdata = () => {
        const modifiedData = data.map((robotData) =>
          responseTemplate(robotData)
        );
        setResponse(modifiedData);
      };

      formatdata();
    }
  }, [data]);

  return (
    <MarsContext.Provider value={response} error={error}>
      {children}
    </MarsContext.Provider>
  );
};

export const useMarsContextAPI = () => {
  const context = useContext(MarsContext);
  if (context === undefined) {
    throw new Error('Context must be used within a Provider');
  }
  return context;
};
