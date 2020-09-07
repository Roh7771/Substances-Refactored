import React from 'react';
import renderer from 'react-test-renderer';
import App from './app';
import { AuthorizationStatus, ModalWindowStatus } from '../../const';
import { SubstanceType, LocationCollectionType } from '../../types';

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

const mockLocationCollection: LocationCollectionType = new Map<
  number,
  Set<string>
>([
  [111, new Set(['first place', 'second place'])],
  [222, new Set(['first place', 'second place'])],
]);

it('App should render sign in block', () => {
  jest.spyOn(React, 'useEffect').mockImplementation(() => {});
  jest.spyOn(React, 'useReducer').mockReturnValue([
    {
      appStatusState: {
        errorStatus: 0,
        isRequestLoading: false,
        isSessionChecking: false,
        modalWindowStatus: 'NONE',
      },
      authState: {
        authorizationStatus: 1,
        csrfToken: '',
      },
      substancesState: {
        locationCollection: new Map(),
        queryStringData: {
          search: { type: 'casNumber', value: '' },
          locations: Array(0),
        },
        substanceList: [],
        substanceToEdit: null,
        substancesToShow: 20,
      },
    },
    () => {},
  ]);
  const tree = renderer.create(<App />);
  expect(tree).toMatchSnapshot();
});

it('App should render substance list', () => {
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
        locationCollection: mockLocationCollection,
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
  const tree = renderer.create(<App />);
  expect(tree).toMatchSnapshot();
});

it('App should render create window', () => {
  jest.spyOn(React, 'useReducer').mockReturnValue([
    {
      appStatusState: {
        errorStatus: 0,
        isRequestLoading: false,
        isSessionChecking: false,
        modalWindowStatus: ModalWindowStatus.CREATE,
      },
      authState: {
        authorizationStatus: AuthorizationStatus.AUTH,
        csrfToken: '',
      },
      substancesState: {
        locationCollection: mockLocationCollection,
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
  const tree = renderer.create(<App />);
  expect(tree).toMatchSnapshot();
});

it('App should render edit window', () => {
  jest.spyOn(React, 'useReducer').mockReturnValue([
    {
      appStatusState: {
        errorStatus: 0,
        isRequestLoading: false,
        isSessionChecking: false,
        modalWindowStatus: ModalWindowStatus.EDIT,
      },
      authState: {
        authorizationStatus: AuthorizationStatus.AUTH,
        csrfToken: '',
      },
      substancesState: {
        locationCollection: mockLocationCollection,
        queryStringData: {
          search: { type: 'casNumber', value: '' },
          locations: [],
        },
        substanceList: mockSubstanceList,
        substanceToEdit: mockSubstance,
        substancesToShow: 20,
      },
    },
    () => {},
  ]);
  const tree = renderer.create(<App />);
  expect(tree).toMatchSnapshot();
});

it('App should render delete confirm window', () => {
  jest.spyOn(React, 'useReducer').mockReturnValue([
    {
      appStatusState: {
        errorStatus: 0,
        isRequestLoading: false,
        isSessionChecking: false,
        modalWindowStatus: ModalWindowStatus.DELETE,
      },
      authState: {
        authorizationStatus: AuthorizationStatus.AUTH,
        csrfToken: '',
      },
      substancesState: {
        locationCollection: mockLocationCollection,
        queryStringData: {
          search: { type: 'casNumber', value: '' },
          locations: [],
        },
        substanceList: mockSubstanceList,
        substanceToEdit: mockSubstance,
        substancesToShow: 20,
      },
    },
    () => {},
  ]);
  const tree = renderer.create(<App />);
  expect(tree).toMatchSnapshot();
});

it('App should render session checking message', () => {
  jest.spyOn(React, 'useReducer').mockReturnValue([
    {
      appStatusState: {
        errorStatus: 0,
        isRequestLoading: false,
        isSessionChecking: true,
        modalWindowStatus: ModalWindowStatus.NONE,
      },
      authState: {
        authorizationStatus: AuthorizationStatus.NO_AUTH,
        csrfToken: '',
      },
      substancesState: {
        locationCollection: new Map(),
        queryStringData: {
          search: { type: 'casNumber', value: '' },
          locations: [],
        },
        substanceList: [],
        substanceToEdit: null,
        substancesToShow: 20,
      },
    },
    () => {},
  ]);
  const tree = renderer.create(<App />);
  expect(tree).toMatchSnapshot();
});
