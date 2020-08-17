import {
  LocationCollectionType,
  SubstanceType,
  QueryStringDataType,
} from '../../types';

export type SubstanceStateType = {
  substanceList: SubstanceType[];
  substanceToEdit: SubstanceType | null;
  locationCollection: LocationCollectionType;
  substancesToShow: number;
  queryStringData: QueryStringDataType;
};

export type SubstanceActionConstTypes = {
  SET_SUBSTANCE_LIST: 'SET_SUBSTANCE_LIST';
  SET_SUBSTANCE_TO_EDIT: 'SET_SUBSTANCE_TO_EDIT';
  SET_LOCATION_COLLECTION: 'SET_LOCATION_COLLECTION';
  ADD_SUBSTANCES_TO_SHOW_COUNT: 'ADD_SUBSTANCES_TO_SHOW_COUNT';
  RESET_SUBSTANCES_TO_SHOW_COUNT: 'RESET_SUBSTANCES_TO_SHOW_COUNT';
  SET_QUERY_SEARCH_DATA: 'SET_QUERY_SEARCH_DATA';
  SET_QUERY_LOCATION_DATA: 'SET_QUERY_LOCATION_DATA';
  LOAD_FULL_SUBSTANCE_LIST: 'LOAD_FULL_SUBSTANCE_LIST';
  QUERRY_NEW_DATA: 'QUERRY_NEW_DATA';
  CREATE_SUBSTANCE: 'CREATE_SUBSTANCE';
  UPDATE_SUBSTANCE: 'UPDATE_SUBSTANCE';
  DELETE_SUBSTANCE: 'DELETE_SUBSTANCE';
};

export type SetSubstanceListActionType = {
  type: SubstanceActionConstTypes['SET_SUBSTANCE_LIST'];
  payload: SubstanceType[];
};

export type SetSubstanceToEditActionType = {
  type: SubstanceActionConstTypes['SET_SUBSTANCE_TO_EDIT'];
  payload: SubstanceType | null;
};

export type SetLocationCollectionActionType = {
  type: SubstanceActionConstTypes['SET_LOCATION_COLLECTION'];
  payload: LocationCollectionType;
};

export type AddSubstanceToShowCountActionType = {
  type: SubstanceActionConstTypes['ADD_SUBSTANCES_TO_SHOW_COUNT'];
};

export type ResetSubstanceToShowCountActionType = {
  type: SubstanceActionConstTypes['RESET_SUBSTANCES_TO_SHOW_COUNT'];
};

export type SetQuerySearchDataActionType = {
  type: SubstanceActionConstTypes['SET_QUERY_SEARCH_DATA'];
  payload: {
    type: string;
    value: string;
  };
};

export type SetQueryLocationDataActionType = {
  type: SubstanceActionConstTypes['SET_QUERY_LOCATION_DATA'];
  payload: number[];
};

export type LoadFullSubstanceListActionType = {
  type: SubstanceActionConstTypes['LOAD_FULL_SUBSTANCE_LIST'];
};

export type QuerryNewDataActionType = {
  type: SubstanceActionConstTypes['QUERRY_NEW_DATA'];
  payload: QueryStringDataType;
};

export type CreateSubstanceActionType = {
  type: SubstanceActionConstTypes['CREATE_SUBSTANCE'];
  payload: {
    csrfToken: string;
    substance: SubstanceType;
    substanceList: SubstanceType[];
  };
};

export type UpdateSubstanceActionType = {
  type: SubstanceActionConstTypes['UPDATE_SUBSTANCE'];
  payload: {
    csrfToken: string;
    substance: SubstanceType;
    substanceList: SubstanceType[];
  };
};

export type DeleteSubstanceActionType = {
  type: SubstanceActionConstTypes['DELETE_SUBSTANCE'];
  payload: {
    csrfToken: string;
    substanceToDelete: SubstanceType;
    substanceList: SubstanceType[];
  };
};

export type SubstanceActionTypes =
  | SetSubstanceListActionType
  | SetSubstanceToEditActionType
  | SetLocationCollectionActionType
  | AddSubstanceToShowCountActionType
  | ResetSubstanceToShowCountActionType
  | SetQuerySearchDataActionType
  | SetQueryLocationDataActionType
  | LoadFullSubstanceListActionType
  | QuerryNewDataActionType
  | CreateSubstanceActionType
  | UpdateSubstanceActionType
  | DeleteSubstanceActionType;
