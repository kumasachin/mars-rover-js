import React from 'react';
import {
  render,
  screen,
  fireEvent,
  waitFor,
  cleanup,
} from '@testing-library/react';
import Enzyme, { mount } from 'enzyme';
import App from './App';
import data from './mocks/';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });

describe('App snapshot match', () => {
  afterEach(cleanup);
  beforeEach(() => render(<App />));
  it('should take a snapshot', () => {
    const { asFragment } = render(<App />);
    expect(asFragment(<App />)).toMatchSnapshot();
  });
  it('CSV selector should visible without grid', () => {
    const container01 = mount(<App />);
    expect(container01.find('div.react-csv-input').length).toEqual(1);
    expect(container01.find('table.grid-container').length).toEqual(0);
  });
});

describe('App custom CSV file upload', () => {
  afterEach(cleanup);
  const container = mount(<App />);

  it('CSV selector should visible without grid', () => {
    expect(container.find('input[type="file"]').length).toEqual(1);
  });
});

describe('App CSV rendered grid', () => {
  const container = mount(<App CSVTestData={data} />);

  it('CSV selector should visible with grid', () => {
    expect(container.find('div.add-new-form').length).toEqual(1);
    expect(container.find('input[name="roboname"]').length).toEqual(1);
    expect(container.find('input[name="csvSubmit"]').length).toEqual(1);
  });
  it('CSV selector should visible with grid', () => {
    expect(container.find('table.grid-container').length).toEqual(1);
  });
  it('CSV selector robo should placed one by one', () => {
    expect(container.find('span.robot').length).toEqual(1);
  });
});
