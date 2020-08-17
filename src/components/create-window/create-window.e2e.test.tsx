import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import CreateWindow from './create-window';
import { SubstanceType } from '../../types';
import { ModalWindowStatus } from '../../const';
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

it('onConfirmClick update substance', async () => {
  const dispatch = jest.fn();
  const resetModalWindow = jest.fn((...args) => [...args]);
  const useRefSpy = jest
    .spyOn(React, 'useRef')
    .mockReturnValue({ current: { value: '1' } });

  const createWindow = shallow(
    <CreateWindow
      dispatch={dispatch as React.Dispatch<CombinedActionTypes>}
      locationCollection={
        new Map([
          [111, new Set(['first place', 'second place'])],
          [222, new Set(['first place', 'second place'])],
        ])
      }
      resetModalWindow={resetModalWindow}
      substanceToEdit={mockSubstance}
      type={ModalWindowStatus.EDIT}
      csrfToken="token"
      substanceList={mockSubstanceList}
    />,
  );

  const formEl = createWindow.find('.edit-field__form');

  await formEl.simulate('submit', { preventDefault: () => {} });

  expect(useRefSpy).toHaveBeenCalledTimes(8);
  expect(dispatch).toHaveBeenCalledTimes(1);
  expect(resetModalWindow).toHaveBeenCalledTimes(1);
  expect(dispatch).toHaveBeenNthCalledWith(1, {
    type: 'UPDATE_SUBSTANCE',
    payload: {
      substance: {
        _id: 4,
        location: 1,
        amount: '1',
        casNumber: '1',
        name: '1',
        place: '1',
        company: '1',
        number: 1,
      },
      substanceList: mockSubstanceList,
      csrfToken: 'token',
    },
  });
});

it('handleConfirmClick create substance', async () => {
  const dispatch = jest.fn();
  const resetModalWindow = jest.fn((...args) => [...args]);
  const useRefSpy = jest
    .spyOn(React, 'useRef')
    .mockReturnValue({ current: { value: '1' } });

  const createWindow = shallow(
    <CreateWindow
      dispatch={dispatch as React.Dispatch<CombinedActionTypes>}
      locationCollection={
        new Map([
          [111, new Set(['first place', 'second place'])],
          [222, new Set(['first place', 'second place'])],
        ])
      }
      resetModalWindow={resetModalWindow}
      substanceToEdit={null}
      type={ModalWindowStatus.CREATE}
      csrfToken="token"
      substanceList={mockSubstanceList}
    />,
  );

  const formEl = createWindow.find('.edit-field__form');

  await formEl.simulate('submit', { preventDefault: () => {} });

  expect(useRefSpy).toHaveBeenCalledTimes(16);
  expect(dispatch).toHaveBeenCalledTimes(1);
  expect(resetModalWindow).toHaveBeenCalledTimes(1);
  expect(dispatch).toHaveBeenNthCalledWith(1, {
    type: 'CREATE_SUBSTANCE',
    payload: {
      substance: {
        location: 1,
        amount: '1',
        casNumber: '1',
        name: '1',
        place: '1',
        company: '1',
        number: 1,
      },
      substanceList: mockSubstanceList,
      csrfToken: 'token',
    },
  });
});

it('onCloseButtonClick work correctly', () => {
  const dispatch = jest.fn((...args) => [...args]);
  const resetModalWindow = jest.fn();

  const createWindow = shallow(
    <CreateWindow
      dispatch={dispatch as React.Dispatch<CombinedActionTypes>}
      locationCollection={
        new Map([
          [111, new Set(['first place', 'second place'])],
          [222, new Set(['first place', 'second place'])],
        ])
      }
      resetModalWindow={resetModalWindow}
      substanceToEdit={null}
      type={ModalWindowStatus.CREATE}
      csrfToken="token"
      substanceList={mockSubstanceList}
    />,
  );

  const closeButtonEl = createWindow.find('.edit-field__close');

  closeButtonEl.simulate('click');

  expect(resetModalWindow).toHaveBeenCalledTimes(1);
});
