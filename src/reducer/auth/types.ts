import { AuthorizationStatus } from '../../const';
import { LoginDataType } from '../../types';

export type AuthStateType = {
  authorizationStatus: AuthorizationStatus;
  csrfToken: string;
};

export type AuthActionConstsTypes = {
  SET_AUTHORIZATION_STATUS: 'SET_AUTHORIZATION_STATUS';
  SET_CSRF_TOKEN: 'SET_CSRF_TOKEN';
  CHECK_SESSION: 'CHECK_SESSION';
  LOGIN: 'LOGIN';
};

export type SetAuthorizationStatusActionType = {
  type: AuthActionConstsTypes['SET_AUTHORIZATION_STATUS'];
  payload: AuthorizationStatus;
};

export type SetCSRFTokenActionType = {
  type: AuthActionConstsTypes['SET_CSRF_TOKEN'];
  payload: string;
};

export type CheckSessionActionType = {
  type: AuthActionConstsTypes['CHECK_SESSION'];
};

export type LoginActionType = {
  type: AuthActionConstsTypes['LOGIN'];
  payload: { loginData: LoginDataType; csrfToken: string };
};

export type AuthActionTypes =
  | SetAuthorizationStatusActionType
  | LoginActionType
  | SetCSRFTokenActionType
  | CheckSessionActionType;
