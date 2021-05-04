import { render, cleanup } from '@testing-library/react';
import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Planet from './planet';

Enzyme.configure({ adapter: new Adapter() });

const data = {
  map: {
    x: 1611,
    y: 16,
  },
  lostCell: {
    xaxis: [],
    yaxis: [],
  },
  dimension: {
    xaxis: 6,
    yaxis: 6,
  },
  robots: [
    {
      name: 'R1',
      color: 'green',
      currentPosition: '0 0 N',
      xaxis: 0,
      yaxis: 1,
      direction: 'N',
      instructions: 'FFFFFFFFFFFFFFFFFFF',
    },
    {
      name: 'R2',
      color: 'green',
      currentPosition: '0 14 N',
      xaxis: 0,
      yaxis: 1,
      direction: 'N',
      instructions: 'FRFFFFFFF',
    },
  ],
};

jest.mock('../../context/marsContext', () => {
  return {
    useMarsContextAPI: () => data,
  };
});

describe('Planet Grid rendering', () => {
  it('should take a snapshot', () => {
    const { asFragment } = render(<Planet />);
    expect(asFragment(<Planet />)).toMatchSnapshot();
  });
});

describe('<Planet /> should render ', () => {
  let wrapper,
    createWrapper = (collection) =>
      mount(<Planet name="mars" data={collection} />);
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should have the button to start robot movement', async () => {
    wrapper = createWrapper(data.robots);
    expect(wrapper.find('button.init')).toBeDefined();
  });
});

describe('Planet rendered grid', () => {
  const container = mount(<Planet />);

  it('Planet should visible with grid', () => {
    expect(container.find('div.planet-container').length).toEqual(1);
  });
  it('Planet should visible with grid', () => {
    expect(container.find('.planet-surface').length).toEqual(1);
    expect(container.find('.grid-container').length).toEqual(1);
    expect(container.find('.grid-row').length).toEqual(6);
  });
});
