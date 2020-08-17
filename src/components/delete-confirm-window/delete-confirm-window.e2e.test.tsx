import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import DeleteConfirmWindow from './delete-confirm-window';
import { SubstanceType } from '../../types';
import { CombinedActionTypes } from '../../reducer/rootReducer/types';

configure({
  adapter: new Adapter(),
});

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

it('handleDeleteConfirmClick works correctly', () => {
  const dispatch = jest.fn((...args) => [...args]);
  const resetModalWindow = jest.fn((...args) => [...args]);

  const deleteConfirmWindow = shallow(
    <DeleteConfirmWindow
      dispatch={dispatch as React.Dispatch<CombinedActionTypes>}
      substance={mockSubstance}
      substanceList={mockSubstanceList}
      resetModalWindow={resetModalWindow}
      csrfToken="token"
    />,
  );

  const acceptButtonEl = deleteConfirmWindow.find('.btn').at(0);

  acceptButtonEl.simulate('click', { target: { value: mockSubstance } });

  expect(dispatch).toHaveBeenNthCalledWith(1, {
    type: 'DELETE_SUBSTANCE',
    payload: {
      substanceToDelete: mockSubstance,
      substanceList: mockSubstanceList,
      csrfToken: 'token'
    },
  });
});

it('handleCloseButtonClick works correctly', () => {
  const dispatch = jest.fn((...args) => [...args]);
  const resetModalWindow = jest.fn((...args) => [...args]);

  const deleteConfirmWindow = shallow(
    <DeleteConfirmWindow
      dispatch={dispatch as React.Dispatch<CombinedActionTypes>}
      substance={mockSubstance}
      substanceList={mockSubstanceList}
      resetModalWindow={resetModalWindow}
      csrfToken="token"
    />,
  );

  const cancelButtonEl = deleteConfirmWindow.find('.btn').at(1);

  cancelButtonEl.simulate('click');

  expect(resetModalWindow).toHaveBeenCalledTimes(1);
});
