import { render, cleanup } from '@testing-library/react';
import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Planet from './planet';

Enzyme.configure({ adapter: new Adapter() });

const data = {
  response: {
    map: {
      x: 1611,
      y: 16,
    },
    lostCell: {
      x: [],
      y: [],
    },
    robots: [
      {
        name: 'R1',
        color: 'green',
        currentPosition: '0 0 N',
        x: 0,
        y: 1,
        d: 'N',
        instructions: 'FFFFFFFFFFFFFFFFFFF',
      },
      {
        name: 'R2',
        color: 'green',
        currentPosition: '0 14 N',
        x: 0,
        y: 1,
        d: 'N',
        instructions: 'FRFFFFFFF',
      },
    ],
  },
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

describe('<Planet /> should', () => {
  let wrapper,
    createWrapper = (collection) =>
      mount(<Planet name="mars" data={collection} />);
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should have the button to start robot movement', async () => {
    wrapper = createWrapper(data.response.robots);
    expect(wrapper.find('button.init')).toBeDefined();
  });
});
