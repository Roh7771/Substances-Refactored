import {
  AppStatusStateType,
  SetModalWindowStatusActionType,
  AppStatusActionConstsTypes,
  SetSessionCheckingStatusActionType,
  SetRequestLoadingStatusActionType,
  AppStatusActionTypes,
  SetErrorStatusActionType,
} from './types';
import { ModalWindowStatus, ErrorStatus } from '../../const';

const appStatusInitialState: AppStatusStateType = {
  isRequestLoading: false,
  isSessionChecking: true,
  modalWindowStatus: ModalWindowStatus.NONE,
  errorStatus: ErrorStatus.OK,
};

const actionTypes: AppStatusActionConstsTypes = {
  SET_MODAL_WINDOW_STATUS: 'SET_MODAL_WINDOW_STATUS',
  SET_SESSION_CHECKING_STATUS: 'SET_SESSION_CHECKING_STATUS',
  SET_REQUEST_LOADING_STATUS: 'SET_REQUEST_LOADING_STATUS',
  SET_ERROR_STATUS: 'SET_ERROR_STATUS',
};

const appStatusActionCreators = {
  setModalWindowStatus: (
    status: ModalWindowStatus,
  ): SetModalWindowStatusActionType => ({
    type: actionTypes.SET_MODAL_WINDOW_STATUS,
    payload: status,
  }),

  setSessionCheckingStatus: (
    status: boolean,
  ): SetSessionCheckingStatusActionType => ({
    type: actionTypes.SET_SESSION_CHECKING_STATUS,
    payload: status,
  }),

  setRequestLoadingStatus: (
    status: boolean,
  ): SetRequestLoadingStatusActionType => ({
    type: actionTypes.SET_REQUEST_LOADING_STATUS,
    payload: status,
  }),

  setErrorStatus: (status: ErrorStatus): SetErrorStatusActionType => ({
    type: actionTypes.SET_ERROR_STATUS,
    payload: status,
  }),
};

const appStatusReducer = (
  state: AppStatusStateType,
  action: AppStatusActionTypes,
): AppStatusStateType => {
  switch (action.type) {
    case actionTypes.SET_MODAL_WINDOW_STATUS:
      return {
        ...state,
        modalWindowStatus: action.payload,
      };

    case actionTypes.SET_SESSION_CHECKING_STATUS:
      return {
        ...state,
        isSessionChecking: action.payload,
      };

    case actionTypes.SET_REQUEST_LOADING_STATUS:
      return {
        ...state,
        isRequestLoading: action.payload,
      };

    case actionTypes.SET_ERROR_STATUS:
      return {
        ...state,
        errorStatus: action.payload,
      };

    default:
      return state;
  }
};

export { appStatusReducer, appStatusActionCreators, appStatusInitialState };
