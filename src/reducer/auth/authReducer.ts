import { AxiosInstance } from 'axios';
import {
  AuthStateType,
  AuthActionConstsTypes,
  AuthActionTypes,
  SetAuthorizationStatusActionType,
  SetCSRFTokenActionType,
  CheckSessionActionType,
  LoginActionType,
} from './types';
import { AuthorizationStatus, ErrorStatus } from '../../const';
import { CombinedActionTypes } from '../rootReducer/types';
import { appStatusActionCreators } from '../appStatus/appStatusReducer';
import { CSRFTokenServerResponseType, LoginDataType } from '../../types';

const authInitialState: AuthStateType = {
  authorizationStatus: AuthorizationStatus.NO_AUTH,
  csrfToken: '',
};

const actionTypes: AuthActionConstsTypes = {
  SET_AUTHORIZATION_STATUS: 'SET_AUTHORIZATION_STATUS',
  SET_CSRF_TOKEN: 'SET_CSRF_TOKEN',
  CHECK_SESSION: 'CHECK_SESSION',
  LOGIN: 'LOGIN',
};

const authActionCreators = {
  setAuthorizationStatus: (
    status: AuthorizationStatus,
  ): SetAuthorizationStatusActionType => ({
    type: actionTypes.SET_AUTHORIZATION_STATUS,
    payload: status,
  }),

  setCsrfToken: (token: string): SetCSRFTokenActionType => ({
    type: actionTypes.SET_CSRF_TOKEN,
    payload: token,
  }),

  checkSession: (): CheckSessionActionType => ({
    type: actionTypes.CHECK_SESSION,
  }),

  login: (loginData: LoginDataType, csrfToken: string): LoginActionType => ({
    type: actionTypes.LOGIN,
    payload: { loginData, csrfToken },
  }),
};

const Operation = {
  checkSession: async (
    dispatch: React.Dispatch<CombinedActionTypes>,
    api: AxiosInstance,
  ) => {
    try {
      const { data } = await api.request<CSRFTokenServerResponseType>({
        url: '/users/login',
      });
      dispatch(authActionCreators.setCsrfToken(data.csrfToken));
      dispatch(
        authActionCreators.setAuthorizationStatus(AuthorizationStatus.AUTH),
      );
    } catch (res) {
      dispatch(authActionCreators.setCsrfToken(res.response.data.csrfToken));
    } finally {
      dispatch(appStatusActionCreators.setSessionCheckingStatus(false));
    }
  },

  login: async (
    dispatch: React.Dispatch<CombinedActionTypes>,
    api: AxiosInstance,
    payload: { loginData: LoginDataType; csrfToken: string },
  ) => {
    dispatch(appStatusActionCreators.setRequestLoadingStatus(true));
    try {
      await api.request({
        method: 'POST',
        url: '/users/login',
        data: { ...payload.loginData, _csrf: payload.csrfToken },
      });
      dispatch(
        authActionCreators.setAuthorizationStatus(AuthorizationStatus.AUTH),
      );
      dispatch(appStatusActionCreators.setErrorStatus(ErrorStatus.OK));
    } catch (error) {
      dispatch(
        appStatusActionCreators.setErrorStatus(ErrorStatus.WRONG_LOGIN_DATA),
      );
    } finally {
      dispatch(appStatusActionCreators.setRequestLoadingStatus(false));
    }
  },
};

const authReducer = (
  state: AuthStateType,
  action: AuthActionTypes,
): AuthStateType => {
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

export {
  authInitialState,
  authReducer,
  authActionCreators,
  Operation as authOperation,
};
