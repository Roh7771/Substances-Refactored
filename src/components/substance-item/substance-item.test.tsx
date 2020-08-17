import React from 'react';
import renderer from 'react-test-renderer';
import { SubstanceType } from '../../types';
import SubstanceItem from './substance-item';

const mockSubstance: SubstanceType = {
  location: 111,
  name: 'some name',
  number: 1,
  place: 'some place',
  _id: 4,
};

it('Substance item should render correctly', () => {
  const tree = renderer.create(<SubstanceItem substance={mockSubstance} />);
  expect(tree).toMatchSnapshot();
});
