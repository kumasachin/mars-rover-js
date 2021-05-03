import React, { useState } from 'react';

import { useFetch } from '../../hooks/use-fetch';
import { CONFIG } from '../../config/';
import LABELS from '../../labels/';
import './planet.css';

const Planet = () => {
  const {
    PAGE: {
      PLANET: { ACTBUTON01, DATA_NOT_FOUND },
    },
    MESSAGE: { LOADING },
  } = LABELS;
  const [excutionStatus, setExcutionStatus] = useState(0);
  const { response } = useFetch(CONFIG.PATH.marsapi, null, true);
  console.log('get response', response);

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
        <div>{LOADING}</div>
        <div>{DATA_NOT_FOUND}</div>
      </div>
    </>
  );
};

export default Planet;
