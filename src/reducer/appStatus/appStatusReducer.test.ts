import { appStatusReducer, appStatusActionCreators } from './appStatusReducer';
import { ModalWindowStatus, ErrorStatus } from '../../const';

const mockInitialState = {
  isRequestLoading: false,
  isSessionChecking: true,
  modalWindowStatus: ModalWindowStatus.NONE,
  errorStatus: ErrorStatus.OK,
};

describe('Reducer', () => {
  it('set modal window status', () => {
    expect(
      appStatusReducer(mockInitialState, {
        type: 'SET_MODAL_WINDOW_STATUS',
        payload: ModalWindowStatus.DELETE,
      }),
    ).toEqual({
      ...mockInitialState,
      modalWindowStatus: ModalWindowStatus.DELETE,
    });
  });

  it('set session checking status', () => {
    expect(
      appStatusReducer(mockInitialState, {
        type: 'SET_SESSION_CHECKING_STATUS',
        payload: false,
      }),
    ).toEqual({ ...mockInitialState, isSessionChecking: false });
  });

  it('set request loading status', () => {
    expect(
      appStatusReducer(mockInitialState, {
        type: 'SET_REQUEST_LOADING_STATUS',
        payload: true,
      }),
    ).toEqual({ ...mockInitialState, isRequestLoading: true });
  });

  it('set error status', () => {
    expect(
      appStatusReducer(mockInitialState, {
        type: 'SET_ERROR_STATUS',
        payload: ErrorStatus.LOADING_FAILED,
      }),
    ).toEqual({
      ...mockInitialState,
      errorStatus: ErrorStatus.LOADING_FAILED,
    });
  });
});

describe('Action creator', () => {
  it('for setting modal window status returns correct action', () => {
    expect(
      appStatusActionCreators.setModalWindowStatus(ModalWindowStatus.CREATE),
    ).toEqual({
      type: 'SET_MODAL_WINDOW_STATUS',
      payload: ModalWindowStatus.CREATE,
    });
  });

  it('for setting session checking status returns correct action', () => {
    expect(appStatusActionCreators.setSessionCheckingStatus(true)).toEqual({
      type: 'SET_SESSION_CHECKING_STATUS',
      payload: true,
    });
  });

  it('for setting request loading status returns correct action', () => {
    expect(appStatusActionCreators.setRequestLoadingStatus(true)).toEqual({
      type: 'SET_REQUEST_LOADING_STATUS',
      payload: true,
    });
  });

  it('for setting error status returns correct action', () => {
    expect(
      appStatusActionCreators.setErrorStatus(ErrorStatus.DUPLICATE_CAS_NUMBER),
    ).toEqual({
      type: 'SET_ERROR_STATUS',
      payload: ErrorStatus.DUPLICATE_CAS_NUMBER,
    });
  });
});
