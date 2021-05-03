import { render, cleanup } from '@testing-library/react';
import React from 'react';
import Terminal from './terminal';

describe('Terminal snapshot', () => {
  afterEach(cleanup);

  it('should take a snapshot', () => {
    const { asFragment } = render(<Terminal />);
    expect(asFragment(<Terminal />)).toMatchSnapshot();
  });
});
