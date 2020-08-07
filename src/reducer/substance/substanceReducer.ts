import { SubstanceType, LocationCollectionType, QueryStringDataType } from '../../types';
import {
  SubstanceActionConstTypes, SetSubstanceListActionType, SetSubstanceToEditActionType,
  SetLocationCollectionActionType, SetSubstancesLoadingStatusActionType,
  SetSubstanceToShowCountActionType, SubstanceStateType, SubstanceActionTypes,
} from './types';
import { SUBSTANCE_TO_SHOW_AMOUNT } from '../../const';

const substanceInitialState: SubstanceStateType = {
  substanceList: [],
  substanceToEdit: null,
  locationCollection: new Map<number, Set<string>>(),
  isSubstancesLoading: true,
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
  SET_SUBSTANCES_LOADING_STATUS: 'SET_SUBSTANCES_LOADING_STATUS',
  SET_SUBSTANCES_TO_SHOW_COUNT: 'SET_SUBSTANCES_TO_SHOW_COUNT',
  SET_QUERY_STRING_DATA: 'SET_QUERY_STRING_DATA',
};

const substanceActionCreators = {
  setSubstanceList: (substances: SubstanceType[]): SetSubstanceListActionType => ({
    type: actionTypes.SET_SUBSTANCE_LIST,
    payload: substances,
  }),

  setSubstanceToEdit: (substance: SubstanceType | null): SetSubstanceToEditActionType => ({
    type: actionTypes.SET_SUBSTANCE_TO_EDIT,
    payload: substance,
  }),

  setLocationCollection: (
    locationCollection: LocationCollectionType,
  ): SetLocationCollectionActionType => ({
    type: actionTypes.SET_LOCATION_COLLECTION,
    payload: locationCollection,
  }),

  setSubstancesLoadingStatus: (status: boolean): SetSubstancesLoadingStatusActionType => ({
    type: actionTypes.SET_SUBSTANCES_LOADING_STATUS,
    payload: status,
  }),

  setSubstanceToShowCount: (count: number): SetSubstanceToShowCountActionType => ({
    type: actionTypes.SET_SUBSTANCES_TO_SHOW_COUNT,
    payload: count,
  }),

  setQueryStringData: (queryStringData: QueryStringDataType) => ({
    type: actionTypes.SET_QUERY_STRING_DATA,
    payload: queryStringData,
  }),
};

const substanceReducer = (
  state: SubstanceStateType, action: SubstanceActionTypes,
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

    case actionTypes.SET_SUBSTANCES_LOADING_STATUS:
      return {
        ...state,
        isSubstancesLoading: action.payload,
      };

    case actionTypes.SET_SUBSTANCES_TO_SHOW_COUNT:
      return {
        ...state,
        substancesToShow: action.payload,
      };

    case actionTypes.SET_QUERY_STRING_DATA:
      return {
        ...state,
        queryStringData: action.payload,
      };

    default:
      return state;
  }
};

export { substanceReducer, substanceActionCreators, substanceInitialState };
