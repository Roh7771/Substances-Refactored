import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import App from './app';
import * as dispatchMiddleware from '../../reducer/rootReducer/dispatchMiddleware';
import { AuthorizationStatus } from '../../const';
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

it('App should check session and load substances after rendering', done => {
  const dispatch = jest.fn();
  jest.spyOn(dispatchMiddleware, 'default').mockReturnValue(dispatch);

  const useEffectSpy = jest
    .spyOn(React, 'useEffect')
    .mockImplementation(f => f());

  shallow(<App />);
  expect(useEffectSpy).toHaveBeenCalledTimes(2);

  setTimeout(() => {
    expect(dispatch).toHaveBeenCalledTimes(2);
    expect(dispatch).toHaveBeenNthCalledWith(1, {
      type: 'CHECK_SESSION',
    });
    expect(dispatch).toHaveBeenNthCalledWith(2, {
      type: 'LOAD_FULL_SUBSTANCE_LIST',
    });
    done();
  }, 1000);
});

it('App should querry new data', done => {
  jest.spyOn(React, 'useReducer').mockReturnValue([
    {
      appStatusState: {
        errorStatus: 0,
        isRequestLoading: false,
        isSessionChecking: false,
        modalWindowStatus: 'NONE',
      },
      authState: {
        authorizationStatus: AuthorizationStatus.AUTH,
        csrfToken: '',
      },
      substancesState: {
        locationCollection: new Map(),
        queryStringData: {
          search: { type: 'casNumber', value: 'value' },
          locations: [],
        },
        substanceList: mockSubstanceList,
        substanceToEdit: null,
        substancesToShow: 20,
      },
    },
    () => {},
  ]);
  const dispatch = jest.fn();
  jest.spyOn(dispatchMiddleware, 'default').mockReturnValue(dispatch);

  jest
    .spyOn(React, 'useEffect')
    .mockImplementationOnce(() => {})
    .mockImplementationOnce(f => f());

  shallow(<App />);

  setTimeout(() => {
    expect(dispatch).toHaveBeenCalledTimes(2);
    expect(dispatch).toHaveBeenNthCalledWith(1, {
      type: 'QUERRY_NEW_DATA',
      payload: {
        search: { type: 'casNumber', value: 'value' },
        locations: [],
      },
    });
    expect(dispatch).toHaveBeenNthCalledWith(2, {
      type: 'RESET_SUBSTANCES_TO_SHOW_COUNT',
    });
    done();
  }, 1000);
});

it('App should load substances if search input becomes empty', done => {
  jest.spyOn(React, 'useReducer').mockReturnValue([
    {
      appStatusState: {
        errorStatus: 0,
        isRequestLoading: false,
        isSessionChecking: false,
        modalWindowStatus: 'NONE',
      },
      authState: {
        authorizationStatus: AuthorizationStatus.AUTH,
        csrfToken: '',
      },
      substancesState: {
        locationCollection: new Map(),
        queryStringData: {
          search: { type: 'casNumber', value: '' },
          locations: [],
        },
        substanceList: mockSubstanceList,
        substanceToEdit: null,
        substancesToShow: 20,
      },
    },
    () => {},
  ]);
  const dispatch = jest.fn();
  jest.spyOn(dispatchMiddleware, 'default').mockReturnValue(dispatch);

  jest
    .spyOn(React, 'useEffect')
    .mockImplementationOnce(() => {})
    .mockImplementationOnce(f => f());

  shallow(<App />);

  setTimeout(() => {
    expect(dispatch).toHaveBeenCalledTimes(2);
    expect(dispatch).toHaveBeenNthCalledWith(1, {
      type: 'LOAD_FULL_SUBSTANCE_LIST',
    });
    expect(dispatch).toHaveBeenNthCalledWith(2, {
      type: 'RESET_SUBSTANCES_TO_SHOW_COUNT',
    });
    done();
  }, 1000);
});
