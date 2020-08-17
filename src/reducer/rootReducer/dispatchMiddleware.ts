import { AxiosInstance } from 'axios';
import { CombinedActionTypes } from './types';
import { authOperation } from '../auth/authReducer';
import { substanceOperation } from '../substance/substanceReducer';

const dispatchMiddleware = (
  dispatch: React.Dispatch<CombinedActionTypes>,
  api: AxiosInstance,
) => (action: CombinedActionTypes) => {
  switch (action.type) {
    case 'CHECK_SESSION':
      return authOperation.checkSession(dispatch, api);

    case 'LOGIN':
      return authOperation.login(dispatch, api, action.payload);

    case 'LOAD_FULL_SUBSTANCE_LIST':
      return substanceOperation.loadFullSubstanceList(dispatch, api);

    case 'QUERRY_NEW_DATA':
      return substanceOperation.querryNewData(dispatch, api, action.payload);

    case 'CREATE_SUBSTANCE':
      return substanceOperation.createSubstance(dispatch, api, action.payload);

    case 'UPDATE_SUBSTANCE':
      return substanceOperation.updateSubstance(dispatch, api, action.payload);

    case 'DELETE_SUBSTANCE':
      return substanceOperation.deleteSubstance(dispatch, api, action.payload);

    default:
      return dispatch(action);
  }
};

export default dispatchMiddleware;
