import * as React from 'react';
import * as renderer from 'react-test-renderer';
import DeleteConfirmWindow from './delete-confirm-window';
import { SubstanceType } from '../../types';

const noop = () => {};

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

const mockSubstance: SubstanceType = {
  location: 111,
  name: 'some name',
  number: 1,
  place: 'some place',
  _id: 4,
};

it('Delete Confirm Window should render correctly', () => {
  const tree = renderer.create(
    <DeleteConfirmWindow
      dispatch={noop}
      substance={mockSubstance}
      substanceList={mockSubstanceList}
      resetModalWindow={noop}
      csrfToken="token"
    />,
  );
  expect(tree).toMatchSnapshot();
});
