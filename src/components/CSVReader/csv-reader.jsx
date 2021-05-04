import React, { useState, useEffect } from 'react';
import CSVReader from 'react-csv-reader';
import './csv-read.css';
import data from '../../mocks';

export const CSVReaderComponent = ({ setCSVData }) => {
  const [privateCSVData, setCSVPrivateData] = useState(null);
  const [newFieldData, setNewFieldData] = useState();

  const handleForce = (csvData) => {
    setCSVPrivateData(csvData);
  };

  const handleNewAddition = (event) => {
    event.preventDefault();
    if (privateCSVData) {
      const CSVdataClone = [...privateCSVData];
      CSVdataClone.push(newFieldData);
      setCSVPrivateData(CSVdataClone);
    }
  };

  const handleOnBlur = (event) => {
    event.preventDefault();
    const { name, value } = event.currentTarget;
    if (name === 'roboname') {
      setNewFieldData({
        name: value,
        ...newFieldData,
      });
    } else if (name === 'movement') {
      setNewFieldData({
        movement: value,
        ...newFieldData,
      });
    }
  };

  //Local mock enable
  // setCSVData(data);

  const papaparseOptions = {
    header: true,
    dynamicTyping: true,
    skipEmptyLines: true,
    transformHeader: (header) => header.toLowerCase().replace(/\W/g, '_'),
  };

  useEffect(() => {
    if (privateCSVData) {
      setCSVData(privateCSVData);
    }
  }, [privateCSVData, setCSVData]);

  return (
    <>
      <p>Upload CSV with robots movements</p>
      <CSVReader
        cssClass="react-csv-input"
        onFileLoaded={handleForce}
        parserOptions={papaparseOptions}
      />
      <br />
      {privateCSVData && (
        <div className="add-new-form">
          <input
            placeholder="name"
            name="roboname"
            type="input"
            onBlur={handleOnBlur}
          />
          <input
            placeholder="movement"
            name="movement"
            type="input"
            onBlur={handleOnBlur}
          />
          <input
            type="button"
            value="Add new robot"
            onClick={handleNewAddition}
          />
        </div>
      )}
    </>
  );
};

export default CSVReaderComponent;
