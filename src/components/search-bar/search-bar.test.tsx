import * as React from 'react';
import * as renderer from 'react-test-renderer';
import SearchBar from './search-bar';
import { ErrorStatus } from '../../const';

const noop = () => null;

it('Search bar should render correctly', () => {
  const tree = renderer.create(
    <SearchBar
      searchSelectValue="some value"
      searchInputValue="some value"
      errorStatus={ErrorStatus.OK}
      dispatch={noop}
    />,
  );
  expect(tree).toMatchSnapshot();
});
