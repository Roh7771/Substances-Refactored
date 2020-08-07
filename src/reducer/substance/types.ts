import { LocationCollectionType, SubstanceType, QueryStringDataType } from '../../types';

export type SubstanceStateType = {
  substanceList: SubstanceType[],
  substanceToEdit: SubstanceType | null,
  locationCollection: LocationCollectionType,
  isSubstancesLoading: boolean,
  substancesToShow: number,
  queryStringData: QueryStringDataType
}

export type SubstanceActionConstTypes = {
  SET_SUBSTANCE_LIST: 'SET_SUBSTANCE_LIST',
  SET_SUBSTANCE_TO_EDIT: 'SET_SUBSTANCE_TO_EDIT',
  SET_LOCATION_COLLECTION: 'SET_LOCATION_COLLECTION',
  SET_SUBSTANCES_LOADING_STATUS: 'SET_SUBSTANCES_LOADING_STATUS',
  SET_SUBSTANCES_TO_SHOW_COUNT: 'SET_SUBSTANCES_TO_SHOW_COUNT',
  SET_QUERY_STRING_DATA: 'SET_QUERY_STRING_DATA'
};

export type SetSubstanceListActionType = {
  type: SubstanceActionConstTypes['SET_SUBSTANCE_LIST'],
  payload: SubstanceType[]
};

export type SetSubstanceToEditActionType = {
  type: SubstanceActionConstTypes['SET_SUBSTANCE_TO_EDIT'],
  payload: SubstanceType | null
};

export type SetLocationCollectionActionType = {
  type: SubstanceActionConstTypes['SET_LOCATION_COLLECTION'],
  payload: LocationCollectionType
};

export type SetSubstancesLoadingStatusActionType = {
  type: SubstanceActionConstTypes['SET_SUBSTANCES_LOADING_STATUS'],
  payload: boolean
};

export type SetSubstanceToShowCountActionType = {
  type: SubstanceActionConstTypes['SET_SUBSTANCES_TO_SHOW_COUNT'],
  payload: number
};

export type SetQueryStringDataActionType = {
  type: SubstanceActionConstTypes['SET_QUERY_STRING_DATA'],
  payload: QueryStringDataType
}

export type SubstanceActionTypes = SetSubstanceListActionType | SetSubstanceToEditActionType |
SetLocationCollectionActionType | SetSubstancesLoadingStatusActionType |
SetSubstanceToShowCountActionType | SetQueryStringDataActionType;
