import React, { useState, useRef, useEffect } from 'react';
import CSVReader from 'react-csv-reader';
import './csv-read.css';
// import data from '../../mocks';

export const CSVReaderComponent = ({ setCSVData }) => {
  const [privateCSVData, setCSVPrivateData] = useState(null);
  const [newFieldData, setNewFieldData] = useState();
  const nameInput = useRef(null);
  const movementInput = useRef(null);

  const handleForce = (csvData) => {
    setCSVPrivateData(csvData);
  };

  const handleNewAddition = (event) => {
    event.preventDefault();
    if (privateCSVData) {
      const CSVdataClone = [...privateCSVData];
      CSVdataClone.push(newFieldData);
      setCSVPrivateData(CSVdataClone);
      nameInput.current.value = '';
      movementInput.current.value = '';
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

      <br />
      {privateCSVData ? (
        <div className="add-new-form">
          <input
            placeholder="name"
            name="roboname"
            type="input"
            ref={nameInput}
            onBlur={handleOnBlur}
          />
          <input
            placeholder="movement"
            name="movement"
            type="input"
            ref={movementInput}
            onBlur={handleOnBlur}
          />
          <input
            type="button"
            value="Add new robot"
            onClick={handleNewAddition}
          />
        </div>
      ) : (
        <CSVReader
          cssClass="react-csv-input"
          onFileLoaded={handleForce}
          parserOptions={papaparseOptions}
        />
      )}
    </>
  );
};

export default CSVReaderComponent;
