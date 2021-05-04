import React, { useState } from 'react';
import { CSVReaderComponent, Planet } from './components/';
import { MarsContextProvider } from './context/marsContext';
import './App.css';

const App = ({ CSVTestData }) => {
  const [data, setData] = useState();
  const setCSVData = (response) => {
    setData(response);
  };

  return (
    <div className="App">
      <CSVReaderComponent setCSVData={setCSVData} CSVTestData={CSVTestData} />
      <MarsContextProvider data={data || CSVTestData}>
        <Planet />
      </MarsContextProvider>
    </div>
  );
};

export default App;
