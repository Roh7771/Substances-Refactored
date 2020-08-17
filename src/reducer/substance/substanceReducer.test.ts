import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import {
  substanceReducer,
  substanceActionCreators,
  substanceOperation,
} from './substanceReducer';
import { SubstanceStateType } from './types';
import { SubstanceType, LocationCollectionType } from '../../types';

const mockInitialState: SubstanceStateType = {
  substanceList: [],
  substanceToEdit: null,
  locationCollection: new Map<number, Set<string>>(),
  substancesToShow: 20,
  queryStringData: {
    search: {
      type: 'casNumber',
      value: '',
    },
    locations: [],
  },
};

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

const api = axios.create({
  baseURL: 'https://reagent-api.herokuapp.com/api/v1',
  timeout: 30000,
  withCredentials: true,
});

describe('Reducer', () => {
  it('set substance list', () => {
    expect(
      substanceReducer(mockInitialState, {
        type: 'SET_SUBSTANCE_LIST',
        payload: mockSubstanceList,
      }),
    ).toEqual({ ...mockInitialState, substanceList: mockSubstanceList });
  });

  it('set substance to edit', () => {
    expect(
      substanceReducer(mockInitialState, {
        type: 'SET_SUBSTANCE_TO_EDIT',
        payload: mockSubstance,
      }),
    ).toEqual({ ...mockInitialState, substanceToEdit: mockSubstance });
  });

  it('set location collection', () => {
    expect(
      substanceReducer(mockInitialState, {
        type: 'SET_LOCATION_COLLECTION',
        payload: mockLocationCollection,
      }),
    ).toEqual({
      ...mockInitialState,
      locationCollection: mockLocationCollection,
    });
  });

  it('add substances to show count', () => {
    expect(
      substanceReducer(mockInitialState, {
        type: 'ADD_SUBSTANCES_TO_SHOW_COUNT',
      }),
    ).toEqual({ ...mockInitialState, substancesToShow: 40 });
  });

  it('reset substances to show count', () => {
    expect(
      substanceReducer(
        { ...mockInitialState, substancesToShow: 300 },
        {
          type: 'RESET_SUBSTANCES_TO_SHOW_COUNT',
        },
      ),
    ).toEqual(mockInitialState);
  });

  it('set query search data', () => {
    expect(
      substanceReducer(mockInitialState, {
        type: 'SET_QUERY_SEARCH_DATA',
        payload: {
          type: 'name',
          value: 'some value',
        },
      }),
    ).toEqual({
      ...mockInitialState,
      queryStringData: {
        search: {
          type: 'name',
          value: 'some value',
        },
        locations: [],
      },
    });
  });

  it('set query location data', () => {
    expect(
      substanceReducer(mockInitialState, {
        type: 'SET_QUERY_LOCATION_DATA',
        payload: [111, 209],
      }),
    ).toEqual({
      ...mockInitialState,
      queryStringData: {
        ...mockInitialState.queryStringData,
        locations: [111, 209],
      },
    });
  });
});

describe('Action creator', () => {
  it('for setting substance list returns correct action', () => {
    expect(substanceActionCreators.setSubstanceList(mockSubstanceList)).toEqual(
      {
        type: 'SET_SUBSTANCE_LIST',
        payload: mockSubstanceList,
      },
    );
  });

  it('for setting substance to edit returns correct action', () => {
    expect(substanceActionCreators.setSubstanceToEdit(mockSubstance)).toEqual({
      type: 'SET_SUBSTANCE_TO_EDIT',
      payload: mockSubstance,
    });
  });

  it('for setting location collection returns correct action', () => {
    expect(
      substanceActionCreators.setLocationCollection(mockLocationCollection),
    ).toEqual({
      type: 'SET_LOCATION_COLLECTION',
      payload: mockLocationCollection,
    });
  });

  it('for adding substance to show count returns correct action', () => {
    expect(substanceActionCreators.addSubstanceToShowCount()).toEqual({
      type: 'ADD_SUBSTANCES_TO_SHOW_COUNT',
    });
  });

  it('for resetting substance to show count returns correct action', () => {
    expect(substanceActionCreators.resetSubstanceToShowCount()).toEqual({
      type: 'RESET_SUBSTANCES_TO_SHOW_COUNT',
    });
  });

  it('for setting query search data returns correct action', () => {
    expect(
      substanceActionCreators.setQuerySearchData({
        type: 'casNumber',
        value: 'some value',
      }),
    ).toEqual({
      type: 'SET_QUERY_SEARCH_DATA',
      payload: { type: 'casNumber', value: 'some value' },
    });
  });

  it('for setting query location data returns correct action', () => {
    expect(substanceActionCreators.setQueryLocationData([1, 2, 3])).toEqual({
      type: 'SET_QUERY_LOCATION_DATA',
      payload: [1, 2, 3],
    });
  });

  it('for loading full subdstance list returns correct action', () => {
    expect(substanceActionCreators.loadFullSubstanceList()).toEqual({
      type: 'LOAD_FULL_SUBSTANCE_LIST',
    });
  });

  it('for querring new data returns correct action', () => {
    expect(
      substanceActionCreators.querryNewData({
        search: { type: 'name', value: 'some name' },
        locations: [1, 2, 3],
      }),
    ).toEqual({
      type: 'QUERRY_NEW_DATA',
      payload: {
        search: { type: 'name', value: 'some name' },
        locations: [1, 2, 3],
      },
    });
  });

  it('for creating a substance returns correct action', () => {
    expect(
      substanceActionCreators.createSubstance(
        mockSubstance,
        mockSubstanceList,
        'token',
      ),
    ).toEqual({
      type: 'CREATE_SUBSTANCE',
      payload: {
        csrfToken: 'token',
        substance: mockSubstance,
        substanceList: mockSubstanceList,
      },
    });
  });

  it('for updating a substance returns correct action', () => {
    expect(
      substanceActionCreators.updateSubstance(
        mockSubstance,
        mockSubstanceList,
        'token',
      ),
    ).toEqual({
      type: 'UPDATE_SUBSTANCE',
      payload: {
        csrfToken: 'token',
        substance: mockSubstance,
        substanceList: mockSubstanceList,
      },
    });
  });

  it('for deleting a substance returns correct action', () => {
    expect(
      substanceActionCreators.deleteSubstance(
        mockSubstance,
        mockSubstanceList,
        'token',
      ),
    ).toEqual({
      type: 'DELETE_SUBSTANCE',
      payload: {
        csrfToken: 'token',
        substanceToDelete: mockSubstance,
        substanceList: mockSubstanceList,
      },
    });
  });
});

describe('Operation', () => {
  it(`loadFullSubstanceList should make a correct API call to /substances`, async () => {
    const apiMock = new MockAdapter(api);
    apiMock.onGet(`/substances`).reply(200, { substances: mockSubstanceList });
    const mockDispatch = jest.fn();

    await substanceOperation.loadFullSubstanceList(mockDispatch, api);

    expect(mockDispatch).toHaveBeenCalledTimes(4);
    expect(mockDispatch).toHaveBeenNthCalledWith(1, {
      type: 'SET_REQUEST_LOADING_STATUS',
      payload: true,
    });
    expect(mockDispatch).toHaveBeenNthCalledWith(2, {
      type: 'SET_LOCATION_COLLECTION',
      payload: new Map([[111, new Set(['some place'])]]),
    });
    expect(mockDispatch).toHaveBeenNthCalledWith(3, {
      type: 'SET_SUBSTANCE_LIST',
      payload: mockSubstanceList,
    });
    expect(mockDispatch).toHaveBeenNthCalledWith(4, {
      type: 'SET_REQUEST_LOADING_STATUS',
      payload: false,
    });
  });

  it('querryNewData should make correct API call to /substances', async () => {
    const apiMock = new MockAdapter(api);
    apiMock
      .onGet(`/substances/?casNumber=1&location=111`)
      .reply(200, { substances: mockSubstanceList });
    const mockDispatch = jest.fn();

    await substanceOperation.querryNewData(mockDispatch, api, {
      locations: [111],
      search: { type: 'casNumber', value: '1' },
    });

    expect(mockDispatch).toHaveBeenCalledTimes(3);
    expect(mockDispatch).toHaveBeenNthCalledWith(1, {
      type: 'SET_REQUEST_LOADING_STATUS',
      payload: true,
    });
    expect(mockDispatch).toHaveBeenNthCalledWith(2, {
      type: 'SET_SUBSTANCE_LIST',
      payload: mockSubstanceList,
    });
    expect(mockDispatch).toHaveBeenNthCalledWith(3, {
      type: 'SET_REQUEST_LOADING_STATUS',
      payload: false,
    });
  });

  it('createSubstance should make correct API call to /substances', async () => {
    const apiMock = new MockAdapter(api);
    apiMock.onPost('/substances').reply(200, { substance: mockSubstance });
    const mockDispatch = jest.fn();

    await substanceOperation.createSubstance(mockDispatch, api, {
      csrfToken: 'token',
      substance: mockSubstance,
      substanceList: mockSubstanceList,
    });

    expect(mockDispatch).toHaveBeenCalledTimes(1);
    expect(mockDispatch).toHaveBeenNthCalledWith(1, {
      type: 'SET_SUBSTANCE_LIST',
      payload: [mockSubstance, ...mockSubstanceList],
    });
  });

  it('updateSubstance should make correct API call to /substances/:id', async () => {
    const apiMock = new MockAdapter(api);
    apiMock.onPatch('/substances/1').reply(203, {
      substance: { ...mockSubstanceList[0], name: 'some different name' },
    });
    const mockDispatch = jest.fn();

    await substanceOperation.updateSubstance(mockDispatch, api, {
      csrfToken: 'token',
      substance: { ...mockSubstanceList[0], name: 'some different name' },
      substanceList: mockSubstanceList,
    });

    expect(mockDispatch).toHaveBeenCalledTimes(1);
    expect(mockDispatch).toHaveBeenNthCalledWith(1, {
      type: 'SET_SUBSTANCE_LIST',
      payload: [
        {
          location: 111,
          name: 'some different name',
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
      ],
    });
  });

  it('deleteSubstance should make correct API call to /substances/:id', async () => {
    const apiMock = new MockAdapter(api);
    apiMock.onDelete('/substances/1').reply(203, {
      substance: { ...mockSubstanceList[0] },
    });
    const mockDispatch = jest.fn();

    await substanceOperation.deleteSubstance(mockDispatch, api, {
      csrfToken: 'token',
      substanceToDelete: mockSubstanceList[0],
      substanceList: mockSubstanceList,
    });

    expect(mockDispatch).toHaveBeenCalledTimes(1);
    expect(mockDispatch).toHaveBeenNthCalledWith(1, {
      type: 'SET_SUBSTANCE_LIST',
      payload: [
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
      ],
    });
  });
});
