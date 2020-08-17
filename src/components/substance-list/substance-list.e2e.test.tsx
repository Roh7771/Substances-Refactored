import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import SubstanceList from './substance-list';
import { ErrorStatus, ModalWindowStatus } from '../../const';
import { SubstanceType } from '../../types';

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

it('handleCreateButtonClick work correctly', () => {
  const dispatch = jest.fn();

  const substanceList = shallow(
    <SubstanceList
      dispatch={dispatch}
      errorStatus={ErrorStatus.OK}
      isRequestLoading={false}
      substancesToRender={mockSubstanceList}
      isSubstancesLeft
    />,
  );

  const formEl = substanceList.find('.create-button');

  formEl.simulate('click');

  expect(dispatch).toHaveBeenCalledTimes(1);
  expect(dispatch).toHaveBeenNthCalledWith(1, {
    type: 'SET_MODAL_WINDOW_STATUS',
    payload: ModalWindowStatus.CREATE,
  });
});
