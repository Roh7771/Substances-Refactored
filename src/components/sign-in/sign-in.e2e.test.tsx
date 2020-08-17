import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import SignIn from './sign-in';
import { CombinedActionTypes } from '../../reducer/rootReducer/types';
import { ErrorStatus } from '../../const';

configure({
  adapter: new Adapter(),
});

it('handleCheckboxChange works correctly', async () => {
  const dispatch = jest.fn((...args) => [...args]);
  const useRefSpy = jest.spyOn(React, 'useRef').mockReturnValue({ current: { value: 'value' } });

  const signIn = shallow(
    <SignIn
      dispatch={dispatch as React.Dispatch<CombinedActionTypes>}
      isRequestLoading={false}
      errorStatus={ErrorStatus.OK}
      csrfToken="token"
    />,
  );

  const formEl = signIn.find('.signin-form');

  await formEl.simulate('submit', { preventDefault: () => {} });

  expect(useRefSpy).toHaveBeenCalledTimes(2);
  expect(dispatch).toHaveBeenNthCalledWith(1, {
    type: 'LOGIN',
    payload: {
      loginData: {
        name: 'value',
        password: 'value',
      },
      csrfToken: 'token',
    },
  });
});
