import { AuthStateType, AuthActionConstsTypes, AuthActionTypes } from './types';
import { AuthorizationStatus } from '../../types';

const authInitialState: AuthStateType = {
  authorizationStatus: AuthorizationStatus.NO_AUTH,
  csrfToken: '',
};

const actionTypes: AuthActionConstsTypes = {
  SET_AUTHORIZATION_STATUS: 'SET_AUTHORIZATION_STATUS',
  SET_CSRF_TOKEN: 'SET_CSRF_TOKEN',
};

const authActionCreators = {
  setAuthorizationStatus: (status: AuthorizationStatus) => ({
    type: actionTypes.SET_AUTHORIZATION_STATUS,
    payload: status,
  }),

  setCsrfToken: (token: string) => ({
    type: actionTypes.SET_CSRF_TOKEN,
    payload: token,
  }),
};

const authReducer = (state: AuthStateType, action: AuthActionTypes): AuthStateType => {
  switch (action.type) {
    case actionTypes.SET_AUTHORIZATION_STATUS:
      return {
        ...state,
        authorizationStatus: action.payload,
      };

    case actionTypes.SET_CSRF_TOKEN:
      return {
        ...state,
        csrfToken: action.payload,
      };

    default:
      return state;
  }
};

export { authInitialState, authReducer, authActionCreators };
