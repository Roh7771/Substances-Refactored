import * as React from 'react';
import * as renderer from 'react-test-renderer';
import CreateWindow from './create-window';
import { ModalWindowStatus } from '../../const';
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

it('Create window should render correctly', () => {
  const tree = renderer.create(
    <CreateWindow
      dispatch={noop}
      locationCollection={
        new Map([
          [111, new Set(['first place', 'second place'])],
          [222, new Set(['first place', 'second place'])],
        ])
      }
      resetModalWindow={noop}
      substanceToEdit={mockSubstance}
      type={ModalWindowStatus.EDIT}
      csrfToken='token'
      substanceList={mockSubstanceList}
    />,
  );
  expect(tree).toMatchSnapshot();
});

it('Create window should render window with empty field when type property equal create', () => {
  const tree = renderer.create(
    <CreateWindow
      dispatch={noop}
      locationCollection={
        new Map([
          [111, new Set(['first place', 'second place'])],
          [222, new Set(['first place', 'second place'])],
        ])
      }
      resetModalWindow={noop}
      substanceToEdit={null}
      type={ModalWindowStatus.CREATE}
      csrfToken='token'
      substanceList={mockSubstanceList}
    />,
  );
  expect(tree).toMatchSnapshot();
});