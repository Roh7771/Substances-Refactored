import * as React from 'react';
import * as renderer from 'react-test-renderer';
import SignIn from './sign-in';
import { ErrorStatus } from '../../const';

const noop = () => {};

it('Sign in should render correctly', () => {
  const tree = renderer.create(
    <SignIn
      dispatch={noop}
      isRequestLoading={false}
      errorStatus={ErrorStatus.OK}
      csrfToken="token"
    />,
  );
  expect(tree).toMatchSnapshot();
});

it('Sign in field should be disabled while request loading', () => {
  const tree = renderer.create(
    <SignIn
      dispatch={noop}
      isRequestLoading
      errorStatus={ErrorStatus.OK}
      csrfToken="token"
    />,
  );
  expect(tree).toMatchSnapshot();
});

it('Sign in should show an error', () => {
  const tree = renderer.create(
    <SignIn
      dispatch={noop}
      isRequestLoading={false}
      errorStatus={ErrorStatus.WRONG_LOGIN_DATA}
      csrfToken="token"
    />,
  );
  expect(tree).toMatchSnapshot();
});