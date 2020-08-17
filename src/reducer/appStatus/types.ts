import { ModalWindowStatus, ErrorStatus } from '../../const';

export type AppStatusStateType = {
  modalWindowStatus: ModalWindowStatus;
  isSessionChecking: boolean;
  isRequestLoading: boolean;
  errorStatus: ErrorStatus;
};

export type AppStatusActionConstsTypes = {
  SET_MODAL_WINDOW_STATUS: 'SET_MODAL_WINDOW_STATUS';
  SET_SESSION_CHECKING_STATUS: 'SET_SESSION_CHECKING_STATUS';
  SET_REQUEST_LOADING_STATUS: 'SET_REQUEST_LOADING_STATUS';
  SET_ERROR_STATUS: 'SET_ERROR_STATUS';
};

export type SetModalWindowStatusActionType = {
  type: AppStatusActionConstsTypes['SET_MODAL_WINDOW_STATUS'];
  payload: ModalWindowStatus;
};

export type SetSessionCheckingStatusActionType = {
  type: AppStatusActionConstsTypes['SET_SESSION_CHECKING_STATUS'];
  payload: boolean;
};

export type SetRequestLoadingStatusActionType = {
  type: AppStatusActionConstsTypes['SET_REQUEST_LOADING_STATUS'];
  payload: boolean;
};

export type SetErrorStatusActionType = {
  type: AppStatusActionConstsTypes['SET_ERROR_STATUS'];
  payload: ErrorStatus;
};

export type AppStatusActionTypes =
  | SetModalWindowStatusActionType
  | SetErrorStatusActionType
  | SetSessionCheckingStatusActionType
  | SetRequestLoadingStatusActionType;
