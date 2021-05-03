import React, { useState } from 'react';
import { useMarsContextAPI } from '../../context/marsContext';
import LABELS from '../../labels/';
import { Grid } from '../../modules/';
import './planet.css';

const Planet = () => {
  const {
    PAGE: {
      PLANET: { ACTBUTON01, DATA_NOT_FOUND },
    },
    MESSAGE: { LOADING },
  } = LABELS;
  const [excutionStatus, setExcutionStatus] = useState(0);
  const data = useMarsContextAPI();

  const onClickHandler = (event) => {
    event.preventdefault();
    setExcutionStatus(excutionStatus + 1);
  };
  return (
    <>
      <h2>This is</h2>
      <button className="init" onClick={onClickHandler} type="button">
        {ACTBUTON01}
      </button>
      <div className="column">Logs</div>
      <div className="column ">
        {data ? (
          <div>
            <Grid />
          </div>
        ) : (
          <div>{LOADING}</div>
        )}
      </div>
    </>
  );
};

export default Planet;
