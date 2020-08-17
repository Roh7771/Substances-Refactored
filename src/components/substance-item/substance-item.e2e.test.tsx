import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { SubstanceType } from '../../types';
import { ModalWindowStatus } from '../../const';
import SubstanceItem from './substance-item';

configure({
  adapter: new Adapter(),
});

const mockSubstance: SubstanceType = {
  location: 111,
  name: 'some name',
  number: 1,
  place: 'some place',
  _id: 4,
};

it('onEditButtonClick works correctly', () => {
  const dispatch = jest.fn();
  const useRefSpy = jest.spyOn(React, 'useContext').mockReturnValue(dispatch);

  const substanceItem = shallow(<SubstanceItem substance={mockSubstance} />);

  const editButtonEl = substanceItem.find('.btn-primary');

  editButtonEl.simulate('click');

  expect(useRefSpy).toHaveBeenCalledTimes(1);
  expect(dispatch).toHaveBeenCalledTimes(2);
  expect(dispatch).toHaveBeenNthCalledWith(1, {
    type: 'SET_SUBSTANCE_TO_EDIT',
    payload: mockSubstance,
  });
  expect(dispatch).toHaveBeenNthCalledWith(2, {
    type: 'SET_MODAL_WINDOW_STATUS',
    payload: ModalWindowStatus.EDIT,
  });
});

it('onDeleteButtonClick works correctly', () => {
  const dispatch = jest.fn();
  const useRefSpy = jest.spyOn(React, 'useContext').mockReturnValue(dispatch);

  const substanceItem = shallow(<SubstanceItem substance={mockSubstance} />);

  const deleteButtonEl = substanceItem.find('.btn-danger');

  deleteButtonEl.simulate('click');

  expect(useRefSpy).toHaveBeenCalledTimes(2);
  expect(dispatch).toHaveBeenCalledTimes(2);
  expect(dispatch).toHaveBeenNthCalledWith(1, {
    type: 'SET_SUBSTANCE_TO_EDIT',
    payload: mockSubstance,
  });
  expect(dispatch).toHaveBeenNthCalledWith(2, {
    type: 'SET_MODAL_WINDOW_STATUS',
    payload: ModalWindowStatus.DELETE,
  });
});
