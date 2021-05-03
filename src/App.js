import React, { useState } from 'react';
import { CSVReaderComponent, Planet } from './components/';
import { MarsContextProvider } from './context/marsContext';
import './App.css';

const App = () => {
  const [data, setData] = useState();
  const setCSVData = (response) => {
    setData(response);
  };
  console.log('data', data);
  return (
    <div className="App">
      <CSVReaderComponent setCSVData={setCSVData} />
      <MarsContextProvider value={data} data={data}>
        <Planet />
      </MarsContextProvider>
    </div>
  );
};

export default App;
