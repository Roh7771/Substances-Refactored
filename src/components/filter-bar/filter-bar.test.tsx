import * as React from 'react';
import * as renderer from 'react-test-renderer';
import FilterBar from './filter-bar';
import { ErrorStatus } from '../../const';

const noop = () => null;

it('Filter bar should render correctly', () => {
  const tree = renderer.create(
    <FilterBar
      dispatch={noop}
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
  expect(tree).toMatchSnapshot();
});

it('Filter bar should not render when there is an error', () => {
  const tree = renderer.create(
    <FilterBar
      dispatch={noop}
      errorStatus={ErrorStatus.LOADING_FAILED}
      locationCollection={
        new Map([
          [111, new Set(['first place', 'second place'])],
          [222, new Set(['first place', 'second place'])],
        ])
      }
      chosenLocations={[111]}
    />,
  );
  expect(tree).toMatchSnapshot();
});
