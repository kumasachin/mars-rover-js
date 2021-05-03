import React, { useContext, useState, useEffect, createContext } from 'react';
import { CONFIG } from '../config/index';
const MarsContext = createContext();

export const MarsContextProvider = ({ children }) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(CONFIG.PATH.marsapi);
        const json = await res.json();
        setResponse(json);
      } catch (error) {
        setError(error);
      }
    };
    fetchData();
  }, []);

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
