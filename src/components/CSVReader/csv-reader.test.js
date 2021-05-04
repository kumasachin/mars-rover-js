import { render, screen, cleanup } from '@testing-library/react';
import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import CSVReaderComponent from './csv-reader';

Enzyme.configure({ adapter: new Adapter() });

const data = {
  dimension: {
    xaxis: 1,
    yaxis: 1,
  },
  robots: [
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
  ],
};

jest.mock('../../context/marsContext', () => {
  return {
    useMarsContextAPI: () => data,
  };
});

describe('CSV reader snapshot', () => {
  afterEach(cleanup);

  it('should take a snapshot', () => {
    const { asFragment } = render(<CSVReaderComponent />);
    expect(asFragment(<CSVReaderComponent />)).toMatchSnapshot();
  });
});

describe('App CSV rendered grid', () => {
  const container = mount(<CSVReaderComponent CSVTestData={data} />);

  it('CSV selector should visible with grid', () => {
    expect(container.find('div.add-new-form').length).toEqual(1);
    expect(container.find('input[name="roboname"]').length).toEqual(1);
    expect(container.find('input[name="csvSubmit"]').length).toEqual(1);
  });
});
