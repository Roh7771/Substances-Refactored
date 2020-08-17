import React from 'react';
import { LoginDataType } from '../../types';
import { CombinedActionTypes } from '../../reducer/rootReducer/types';
import { authActionCreators } from '../../reducer/auth/authReducer';
import { substanceActionCreators } from '../../reducer/substance/substanceReducer';
import { ErrorStatus } from '../../const';

type Props = {
  dispatch: (action: CombinedActionTypes) => void | Promise<void>;
  isRequestLoading: boolean;
  errorStatus: ErrorStatus;
  csrfToken: string;
};

const SignIn: React.FC<Props> = React.memo(
  ({ dispatch, errorStatus, isRequestLoading, csrfToken }: Props) => {

    const handleLoginButtonClick = React.useCallback(
      async (loginData: LoginDataType) => {
        await dispatch(authActionCreators.login(loginData, csrfToken));
        await dispatch(substanceActionCreators.loadFullSubstanceList());
      },
      [csrfToken],
    );

    const nameInputEl: React.RefObject<HTMLInputElement> = React.useRef(null);
    const passwordInputEl: React.RefObject<HTMLInputElement> = React.useRef(null);

    return (
      <form
        className="signin-form"
        onSubmit={async (e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          if (nameInputEl.current && passwordInputEl.current) {
            await handleLoginButtonClick({
              name: nameInputEl.current.value,
              password: passwordInputEl.current.value,
            });
          }
        }}
      >
        <h1 className="mb-3 text-center">Sign In</h1>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            required
            ref={nameInputEl}
            type="text"
            className="form-control"
            id="name"
            aria-describedby="emailHelp"
            disabled={isRequestLoading}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            required
            ref={passwordInputEl}
            type="password"
            className="form-control"
            id="password"
            disabled={isRequestLoading}
          />
        </div>
        <div
          className="alert alert-danger"
          role="alert"
          style={{
            display:
              errorStatus === ErrorStatus.WRONG_LOGIN_DATA ? 'block' : 'none',
          }}
        >
          Неверный логин или пароль.
        </div>
        <button
          type="submit"
          className="btn btn-primary signin-form__button"
          disabled={isRequestLoading}
        >
          Log In
        </button>
      </form>
    );
  },
);

export default SignIn;
