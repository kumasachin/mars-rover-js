import React from 'react';
import { useMarsContextAPI } from '../../context/marsContext';
import LABELS from '../../labels/';
import { Grid } from '../../modules/';
import './planet.css';

const Planet = () => {
  const {
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
      {data && data.robots && (
        <div className="planet-surface">{renderPlanet()}</div>
      )}
    </div>
  );
};

export default Planet;
