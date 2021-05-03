import { render, screen, cleanup } from '@testing-library/react';
import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Grid from './Grid';

Enzyme.configure({ adapter: new Adapter() });

const data = [
  {
    name: 'R1',
    color: 'green',
    currentPosition: '0 0 N',
    grid: '50 50',
    x: 0,
    y: 1,
    d: 'N',
    instructions: 'FFFFFFFFFFFFFFFFFFF',
  },
  {
    name: 'R2',
    color: 'green',
    grid: '3 3',
    currentPosition: '0 14 N',
    x: 0,
    y: 1,
    d: 'N',
    instructions: 'FRFFFFFFF',
  },
];

jest.mock('../../context/marsContext', () => {
  return {
    useMarsContextAPI: () => data,
  };
});
describe('Grid row snapshot', () => {
  afterEach(cleanup);

  it('should take a snapshot', () => {
    const { asFragment } = render(<Grid />);
    expect(asFragment(<Grid />)).toMatchSnapshot();
  });
});
