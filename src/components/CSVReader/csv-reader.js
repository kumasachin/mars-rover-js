import React, { useState } from 'react';
import CSVReader from 'react-csv-reader';

export const CSVReaderComponent = ({ setCSVData }) => {
  const handleForce = (csvData, fileInfo) => {
    setCSVData(csvData);
  };
  const papaparseOptions = {
    header: true,
    dynamicTyping: true,
    skipEmptyLines: true,
    transformHeader: (header) => header.toLowerCase().replace(/\W/g, '_'),
  };

  return (
    <CSVReader
      cssClass="react-csv-input"
      label="Select CSV with robot position"
      onFileLoaded={handleForce}
      parserOptions={papaparseOptions}
    />
  );
};

export default CSVReaderComponent;
