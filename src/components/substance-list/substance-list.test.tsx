import React from 'react';
import renderer from 'react-test-renderer';
import SubstanceList from './substance-list';
import { SubstanceType } from '../../types';
import { ErrorStatus } from '../../const';

const noop = () => null;

const mockSubstanceList: SubstanceType[] = [
  {
    location: 111,
    name: 'some name',
    number: 1,
    place: 'some place',
    _id: 1,
  },
  {
    location: 111,
    name: 'some name',
    number: 1,
    place: 'some place',
    _id: 2,
  },
  {
    location: 111,
    name: 'some name',
    number: 1,
    place: 'some place',
    _id: 3,
  },
];

it('Substance list should render correctly', () => {
  const tree = renderer.create(
    <SubstanceList
      dispatch={noop}
      errorStatus={ErrorStatus.OK}
      isRequestLoading={false}
      substancesToRender={mockSubstanceList}
      isSubstancesLeft
    />,
  );
  expect(tree).toMatchSnapshot();
});

it('Substance list should render error message', () => {
  const tree = renderer.create(
    <SubstanceList
      dispatch={noop}
      errorStatus={ErrorStatus.LOADING_FAILED}
      isRequestLoading={false}
      substancesToRender={mockSubstanceList}
      isSubstancesLeft
    />,
  );
  expect(tree).toMatchSnapshot();
});

it('Substance list should render empty list message', () => {
  const tree = renderer.create(
    <SubstanceList
      dispatch={noop}
      errorStatus={ErrorStatus.OK}
      isRequestLoading={false}
      substancesToRender={[]}
      isSubstancesLeft
    />,
  );
  expect(tree).toMatchSnapshot();
});

it('Substance list should render request loading spinner', () => {
  const tree = renderer.create(
    <SubstanceList
      dispatch={noop}
      errorStatus={ErrorStatus.OK}
      isRequestLoading
      substancesToRender={[]}
      isSubstancesLeft
    />,
  );
  expect(tree).toMatchSnapshot();
});