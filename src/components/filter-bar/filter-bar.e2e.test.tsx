import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import FilterBar from './filter-bar';
import { ErrorStatus } from '../../const';

configure({
  adapter: new Adapter(),
});

it('handleCheckboxChange works correctly', () => {
  const dispatch = jest.fn((...args) => [...args]);

  const filterBar = shallow(
    <FilterBar
      dispatch={dispatch}
      errorStatus={ErrorStatus.OK}
      locationCollection={
        new Map([
          [111, new Set(['first place', 'second place'])],
          [222, new Set(['first place', 'second place'])],
        ])
      }
      chosenLocations={[111]}
    />,
  );

  const inputEl = filterBar.find('input').at(1);

  inputEl.simulate('change', { target: { value: 222 } });

  expect(dispatch).toHaveBeenNthCalledWith(1, {
    type: 'SET_QUERY_LOCATION_DATA',
    payload: [111, 222],
  });
});
