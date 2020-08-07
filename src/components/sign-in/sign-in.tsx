import * as React from 'react';
import { LoginDataType, ErrorStatus } from '../../types';

interface Props {
  onLoginButtonClick: (data: LoginDataType) => void,
  isRequestLoading: boolean,
  errorStatus: ErrorStatus
}

const SignIn: React.FC<Props> = (props: Props) => {
  const { onLoginButtonClick, errorStatus, isRequestLoading } = props;

  const nameInputEl = React.useRef<HTMLInputElement>(null);
  const passwordInputEl = React.useRef<HTMLInputElement>(null);
  return (
    <form
      className="signin-form"
      onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onLoginButtonClick({
          name: nameInputEl.current?.value as string,
          password: passwordInputEl.current?.value as string,
        });
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
        style={{ display: errorStatus === ErrorStatus.WRONG_LOGIN_DATA ? 'block' : 'none' }}
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
};

export default SignIn;
