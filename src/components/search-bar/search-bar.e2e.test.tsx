import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { ErrorStatus } from '../../const';
import SearchBar from './search-bar';

configure({
  adapter: new Adapter(),
});

it('handleSearchBarChange works correctly when select changes', () => {
  const dispatch = jest.fn((...args) => [...args]);

  const searchBar = shallow(
    <SearchBar
      searchSelectValue="name"
      searchInputValue="value"
      errorStatus={ErrorStatus.OK}
      dispatch={dispatch}
    />,
  );

  const selectEl = searchBar.find('select');

  selectEl.simulate('change', { target: { value: 'CAS RN' } });

  expect(dispatch).toHaveBeenCalledTimes(1);
  expect(dispatch).toHaveBeenNthCalledWith(1, {
    type: 'SET_QUERY_SEARCH_DATA',
    payload: {
      type: 'casNumber',
      value: 'value',
    },
  });
});

it('handleSearchBarChange works correctly when input changes', () => {
  const dispatch = jest.fn((...args) => [...args]);

  const searchBar = shallow(
    <SearchBar
      searchSelectValue="casNumber"
      searchInputValue=""
      errorStatus={ErrorStatus.OK}
      dispatch={dispatch}
    />,
  );

  const selectEl = searchBar.find('input');

  selectEl.simulate('change', { target: { value: 'value' } });

  expect(dispatch).toHaveBeenCalledTimes(1);
  expect(dispatch).toHaveBeenNthCalledWith(1, {
    type: 'SET_QUERY_SEARCH_DATA',
    payload: {
      type: 'casNumber',
      value: 'value',
    },
  });
});
