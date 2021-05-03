import React, { useState, useEffect } from 'react';
import { GridRow } from '../';
import './grid.css';

export const Grid = () => {
  return (
    <table
      cellSpacing="0"
      border="1"
      width="100%"
      height="100%"
      className="grid-container"
    >
      <tbody>
        <GridRow />
      </tbody>
    </table>
  );
};

export default Grid;
