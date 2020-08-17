import Axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { AuthorizationStatus, ErrorStatus } from '../../const';
import { authReducer, authActionCreators, authOperation } from './authReducer';

const api = Axios.create({
  baseURL: 'https://reagent-api.herokuapp.com/api/v1',
  timeout: 30000,
  withCredentials: true,
});

const mockInitialState = {
  authorizationStatus: AuthorizationStatus.NO_AUTH,
  csrfToken: '',
};

describe('Reducer', () => {
  it('set authorization status', () => {
    expect(
      authReducer(mockInitialState, {
        type: 'SET_AUTHORIZATION_STATUS',
        payload: AuthorizationStatus.AUTH,
      }),
    ).toEqual({
      ...mockInitialState,
      authorizationStatus: AuthorizationStatus.AUTH,
    });
  });

  it('set csrfToken', () => {
    expect(
      authReducer(mockInitialState, {
        type: 'SET_CSRF_TOKEN',
        payload: 'token',
      }),
    ).toEqual({
      ...mockInitialState,
      csrfToken: 'token',
    });
  });
});

describe('Action creator', () => {
  it('for setting authorization status', () => {
    expect(
      authActionCreators.setAuthorizationStatus(AuthorizationStatus.AUTH),
    ).toEqual({
      type: 'SET_AUTHORIZATION_STATUS',
      payload: AuthorizationStatus.AUTH,
    });
  });

  it('for setting csrfToken', () => {
    expect(authActionCreators.setCsrfToken('token')).toEqual({
      type: 'SET_CSRF_TOKEN',
      payload: 'token',
    });
  });
});

describe('Operation', () => {
  it('checkSession should make a correct API call to /users/login', async () => {
    const apiMock = new MockAdapter(api);
    apiMock.onGet('/users/login').reply(200, { csrfToken: 'token' });
    const mockDispatch = jest.fn();

    await authOperation.checkSession(mockDispatch, api);

    expect(mockDispatch).toHaveBeenCalledTimes(3);
    expect(mockDispatch).toHaveBeenNthCalledWith(1, {
      type: 'SET_CSRF_TOKEN',
      payload: 'token',
    });
    expect(mockDispatch).toHaveBeenNthCalledWith(2, {
      type: 'SET_AUTHORIZATION_STATUS',
      payload: AuthorizationStatus.AUTH,
    });
    expect(mockDispatch).toHaveBeenNthCalledWith(3, {
      type: 'SET_SESSION_CHECKING_STATUS',
      payload: false,
    });
  });

  it('login should make a correct API call to /users/login', async () => {
    const apiMock = new MockAdapter(api);
    apiMock.onPost('/users/login').reply(200);
    const mockDispatch = jest.fn();

    await authOperation.login(mockDispatch, api, {
      loginData: { name: 'some name', password: 'some password' },
      csrfToken: 'token',
    });

    expect(mockDispatch).toHaveBeenCalledTimes(4);
    expect(mockDispatch).toHaveBeenNthCalledWith(1, {
      type: 'SET_REQUEST_LOADING_STATUS',
      payload: true,
    });
    expect(mockDispatch).toHaveBeenNthCalledWith(2, {
      type: 'SET_AUTHORIZATION_STATUS',
      payload: AuthorizationStatus.AUTH,
    });
    expect(mockDispatch).toHaveBeenNthCalledWith(3, {
      type: 'SET_ERROR_STATUS',
      payload: ErrorStatus.OK,
    });
    expect(mockDispatch).toHaveBeenNthCalledWith(4, {
      type: 'SET_REQUEST_LOADING_STATUS',
      payload: false,
    });
  });
});
