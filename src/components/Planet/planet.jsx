import React, { useState } from 'react';
import { useMarsContextAPI } from '../../context/marsContext';
import LABELS from '../../labels/';
import { Grid } from '../../modules/';
import { Terminal } from '../../components/';
import './planet.css';

const Planet = () => {
  const {
    PAGE: {
      PLANET: { ACTBUTON01 },
    },
    MESSAGE: { LOADING },
  } = LABELS;
  const [excutionStatus, setExcutionStatus] = useState(0);
  const [terminalInput, setTerminalInput] = useState([]);

  const data = useMarsContextAPI();
  const onClickHandler = (event) => {
    event.preventDefault();
    setExcutionStatus(excutionStatus + 1);
  };

  const onRobotAction = (args) => {
    if (
      terminalInput.length === 0 ||
      args.isLost ||
      terminalInput[0].name !== args.name
    ) {
      setTerminalInput([args, ...terminalInput]);
    }
  };

  const renderPlanet = () => {
    if (excutionStatus === 0) {
      return <div>Click above to start</div>;
    } else if (data.robots && excutionStatus) {
      return <Grid onRobotAction={onRobotAction} />;
    }
    return <div>{LOADING}</div>;
  };

  return (
    <>
      <button className="init" onClick={onClickHandler} type="button">
        {ACTBUTON01}
      </button>
      <div className="column">
        <Terminal printLogs={terminalInput} />
      </div>
      <div className="column ">{renderPlanet()}</div>
    </>
  );
};

export default Planet;
