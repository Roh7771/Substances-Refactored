import { AxiosInstance } from 'axios';
import {
  SubstanceType,
  LocationCollectionType,
  AllSubstancesServerResponseType,
  QueryStringDataType,
  OneSubstanceServerResponseType,
} from '../../types';
import {
  SubstanceActionConstTypes,
  SetSubstanceListActionType,
  SetSubstanceToEditActionType,
  SetLocationCollectionActionType,
  SubstanceStateType,
  SubstanceActionTypes,
  AddSubstanceToShowCountActionType,
  ResetSubstanceToShowCountActionType,
  SetQuerySearchDataActionType,
  SetQueryLocationDataActionType,
  LoadFullSubstanceListActionType,
  QuerryNewDataActionType,
  CreateSubstanceActionType,
  UpdateSubstanceActionType,
  DeleteSubstanceActionType,
} from './types';
import { SUBSTANCE_TO_SHOW_AMOUNT, ErrorStatus } from '../../const';
import { CombinedActionTypes } from '../rootReducer/types';
import createLocationCollection from '../../utils/createLocationCollection';
import { appStatusActionCreators } from '../appStatus/appStatusReducer';
import buildQueryString from '../../utils/buildQueryString';
import findAndUpdateSubstance from '../../utils/findAndUpdateSubstance';
import findAndDeleteSubstance from '../../utils/findAndDeleteSubstance';

const substanceInitialState: SubstanceStateType = {
  substanceList: [],
  substanceToEdit: null,
  locationCollection: new Map<number, Set<string>>(),
  substancesToShow: SUBSTANCE_TO_SHOW_AMOUNT,
  queryStringData: {
    search: {
      type: 'casNumber',
      value: '',
    },
    locations: [],
  },
};

const actionTypes: SubstanceActionConstTypes = {
  SET_SUBSTANCE_LIST: 'SET_SUBSTANCE_LIST',
  SET_SUBSTANCE_TO_EDIT: 'SET_SUBSTANCE_TO_EDIT',
  SET_LOCATION_COLLECTION: 'SET_LOCATION_COLLECTION',
  ADD_SUBSTANCES_TO_SHOW_COUNT: 'ADD_SUBSTANCES_TO_SHOW_COUNT',
  RESET_SUBSTANCES_TO_SHOW_COUNT: 'RESET_SUBSTANCES_TO_SHOW_COUNT',
  SET_QUERY_SEARCH_DATA: 'SET_QUERY_SEARCH_DATA',
  SET_QUERY_LOCATION_DATA: 'SET_QUERY_LOCATION_DATA',
  LOAD_FULL_SUBSTANCE_LIST: 'LOAD_FULL_SUBSTANCE_LIST',
  QUERRY_NEW_DATA: 'QUERRY_NEW_DATA',
  CREATE_SUBSTANCE: 'CREATE_SUBSTANCE',
  DELETE_SUBSTANCE: 'DELETE_SUBSTANCE',
  UPDATE_SUBSTANCE: 'UPDATE_SUBSTANCE',
};

const substanceActionCreators = {
  setSubstanceList: (
    substances: SubstanceType[],
  ): SetSubstanceListActionType => ({
    type: actionTypes.SET_SUBSTANCE_LIST,
    payload: substances,
  }),

  setSubstanceToEdit: (
    substance: SubstanceType | null,
  ): SetSubstanceToEditActionType => ({
    type: actionTypes.SET_SUBSTANCE_TO_EDIT,
    payload: substance,
  }),

  setLocationCollection: (
    locationCollection: LocationCollectionType,
  ): SetLocationCollectionActionType => ({
    type: actionTypes.SET_LOCATION_COLLECTION,
    payload: locationCollection,
  }),

  addSubstanceToShowCount: (): AddSubstanceToShowCountActionType => ({
    type: actionTypes.ADD_SUBSTANCES_TO_SHOW_COUNT,
  }),

  resetSubstanceToShowCount: (): ResetSubstanceToShowCountActionType => ({
    type: actionTypes.RESET_SUBSTANCES_TO_SHOW_COUNT,
  }),

  setQuerySearchData: (querySearchData: {
    type: string;
    value: string;
  }): SetQuerySearchDataActionType => ({
    type: actionTypes.SET_QUERY_SEARCH_DATA,
    payload: querySearchData,
  }),

  setQueryLocationData: (
    queryLocationData: number[],
  ): SetQueryLocationDataActionType => ({
    type: actionTypes.SET_QUERY_LOCATION_DATA,
    payload: queryLocationData,
  }),

  loadFullSubstanceList: (): LoadFullSubstanceListActionType => ({
    type: actionTypes.LOAD_FULL_SUBSTANCE_LIST,
  }),

  querryNewData: (
    queryStringData: QueryStringDataType,
  ): QuerryNewDataActionType => ({
    type: actionTypes.QUERRY_NEW_DATA,
    payload: queryStringData,
  }),

  createSubstance: (
    substance: SubstanceType,
    substanceList: SubstanceType[],
    csrfToken: string,
  ): CreateSubstanceActionType => ({
    type: actionTypes.CREATE_SUBSTANCE,
    payload: {
      csrfToken,
      substance,
      substanceList,
    },
  }),

  updateSubstance: (
    substance: SubstanceType,
    substanceList: SubstanceType[],
    csrfToken: string,
  ): UpdateSubstanceActionType => ({
    type: actionTypes.UPDATE_SUBSTANCE,
    payload: {
      csrfToken,
      substance,
      substanceList,
    },
  }),

  deleteSubstance: (
    substanceToDelete: SubstanceType,
    substanceList: SubstanceType[],
    csrfToken: string,
  ): DeleteSubstanceActionType => ({
    type: actionTypes.DELETE_SUBSTANCE,
    payload: {
      substanceToDelete,
      csrfToken,
      substanceList,
    },
  }),
};

const Operation = {
  loadFullSubstanceList: async (
    dispatch: React.Dispatch<CombinedActionTypes>,
    api: AxiosInstance,
  ) => {
    try {
      dispatch(appStatusActionCreators.setRequestLoadingStatus(true));
      const { data: substancesData } = await api.request<
        AllSubstancesServerResponseType
      >({
        url: '/substances',
      });
      dispatch(
        substanceActionCreators.setLocationCollection(
          createLocationCollection(substancesData.substances),
        ),
      );
      dispatch(
        substanceActionCreators.setSubstanceList(substancesData.substances),
      );
    } catch (err) {
      dispatch(
        appStatusActionCreators.setErrorStatus(ErrorStatus.LOADING_FAILED),
      );
    } finally {
      dispatch(appStatusActionCreators.setRequestLoadingStatus(false));
    }
  },

  querryNewData: async (
    dispatch: React.Dispatch<CombinedActionTypes>,
    api: AxiosInstance,
    queryStringData: QueryStringDataType,
  ) => {
    try {
      dispatch(appStatusActionCreators.setRequestLoadingStatus(true));
      const { data: querriedData } = await api.request<
        AllSubstancesServerResponseType
      >({
        method: 'GET',
        url: `/substances/?${buildQueryString(queryStringData)}`,
      });
      dispatch(
        substanceActionCreators.setSubstanceList(querriedData.substances),
      );
    } catch (error) {
      dispatch(
        appStatusActionCreators.setErrorStatus(ErrorStatus.LOADING_FAILED),
      );
    } finally {
      dispatch(appStatusActionCreators.setRequestLoadingStatus(false));
    }
  },

  createSubstance: async (
    dispatch: React.Dispatch<CombinedActionTypes>,
    api: AxiosInstance,
    payload: {
      csrfToken: string;
      substance: SubstanceType;
      substanceList: SubstanceType[];
    },
  ) => {
    const { data: createRequestData } = await api.request<
      OneSubstanceServerResponseType
    >({
      method: 'POST',
      url: '/substances',
      data: {
        _csrf: payload.csrfToken,
        ...payload.substance,
      },
    });
    dispatch(
      substanceActionCreators.setSubstanceList([
        createRequestData.substance,
        ...payload.substanceList,
      ]),
    );
  },

  updateSubstance: async (
    dispatch: React.Dispatch<CombinedActionTypes>,
    api: AxiosInstance,
    payload: {
      csrfToken: string;
      substance: SubstanceType;
      substanceList: SubstanceType[];
    },
  ) => {
    const { data: updateRequestData } = await api.request<
      OneSubstanceServerResponseType
    >({
      method: 'PATCH',
      url: `/substances/${payload.substance._id}`,
      data: {
        ...payload.substance,
        _csrf: payload.csrfToken,
      },
    });
    dispatch(
      substanceActionCreators.setSubstanceList(
        findAndUpdateSubstance(
          payload.substanceList,
          updateRequestData.substance,
        ),
      ),
    );
  },

  deleteSubstance: async (
    dispatch: React.Dispatch<CombinedActionTypes>,
    api: AxiosInstance,
    payload: {
      csrfToken: string;
      substanceToDelete: SubstanceType;
      substanceList: SubstanceType[];
    },
  ) => {
    await api.request({
      method: 'DELETE',
      url: `/substances/${payload.substanceToDelete._id}`,
      data: {
        _csrf: payload.csrfToken,
      },
    });
    dispatch(
      substanceActionCreators.setSubstanceList(
        findAndDeleteSubstance(payload.substanceList, payload.substanceToDelete),
      ),
    );
  },
};

const substanceReducer = (
  state: SubstanceStateType,
  action: SubstanceActionTypes,
): SubstanceStateType => {
  switch (action.type) {
    case actionTypes.SET_SUBSTANCE_LIST:
      return {
        ...state,
        substanceList: action.payload,
      };

    case actionTypes.SET_SUBSTANCE_TO_EDIT:
      return {
        ...state,
        substanceToEdit: action.payload,
      };

    case actionTypes.SET_LOCATION_COLLECTION:
      return {
        ...state,
        locationCollection: action.payload,
      };

    case actionTypes.ADD_SUBSTANCES_TO_SHOW_COUNT:
      return {
        ...state,
        substancesToShow: state.substancesToShow + SUBSTANCE_TO_SHOW_AMOUNT,
      };

    case actionTypes.RESET_SUBSTANCES_TO_SHOW_COUNT:
      return {
        ...state,
        substancesToShow: SUBSTANCE_TO_SHOW_AMOUNT,
      };

    case actionTypes.SET_QUERY_SEARCH_DATA:
      return {
        ...state,
        queryStringData: {
          ...state.queryStringData,
          search: action.payload,
        },
      };

    case actionTypes.SET_QUERY_LOCATION_DATA:
      return {
        ...state,
        queryStringData: {
          ...state.queryStringData,
          locations: action.payload,
        },
      };

    default:
      return state;
  }
};

export {
  substanceReducer,
  substanceActionCreators,
  substanceInitialState,
  Operation as substanceOperation,
};
