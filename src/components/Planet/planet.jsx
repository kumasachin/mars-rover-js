import React, { useState } from 'react';
import { useMarsContextAPI } from '../../context/marsContext';
import LABELS from '../../labels/';
import { Grid } from '../../modules/';
import './planet.css';

const Planet = () => {
  const {
    PAGE: {
      PLANET: { ACTBUTON01 },
    },
    MESSAGE: { LOADING },
  } = LABELS;

  const data = useMarsContextAPI();

  const renderPlanet = () => {
    if (data.robots) {
      return <Grid />;
    }
    return <div>{LOADING}</div>;
  };

  return (
    <div className="planet-container">
      {data && data.robots && <div>{renderPlanet()}</div>}
    </div>
  );
};

export default Planet;
