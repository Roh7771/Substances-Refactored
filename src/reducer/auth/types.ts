import { AuthorizationStatus } from '../../types';

export type AuthStateType = {
  authorizationStatus: AuthorizationStatus,
  csrfToken: string,
}

export type AuthActionConstsTypes = {
  SET_AUTHORIZATION_STATUS: 'SET_AUTHORIZATION_STATUS',
  SET_CSRF_TOKEN: 'SET_CSRF_TOKEN'
}

export type SetAuthorizationStatusActionType = {
  type: AuthActionConstsTypes['SET_AUTHORIZATION_STATUS'],
  payload: AuthorizationStatus
}

export type SetCSRFToken = {
  type: AuthActionConstsTypes['SET_CSRF_TOKEN'],
  payload: string
}

export type AuthActionTypes = SetAuthorizationStatusActionType | SetCSRFToken
