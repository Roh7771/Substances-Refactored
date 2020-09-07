import React from 'react';
import api from '../../api';
import SubstanceList from '../substance-list/substance-list';
import CreateWindow from '../create-window/create-window';
import DeleteConfirmWindow from '../delete-confirm-window/delete-confirm-window';
import SearchBar from '../search-bar/search-bar';
import FilterBar from '../filter-bar/filter-bar';
import SignIn from '../sign-in/sign-in';
import {
  ErrorStatus,
  ModalWindowStatus,
  AuthorizationStatus,
} from '../../const';
import { substanceActionCreators } from '../../reducer/substance/substanceReducer';
import {
  rootReducer,
  combinedInitialState,
} from '../../reducer/rootReducer/rootReducer';
import { RootReducerType } from '../../reducer/rootReducer/types';
import { appStatusActionCreators } from '../../reducer/appStatus/appStatusReducer';
import context from '../../context';
import dispatchMiddleware from '../../reducer/rootReducer/dispatchMiddleware';
import { authActionCreators } from '../../reducer/auth/authReducer';

type Props = {};

const App: React.FC<Props> = () => {
  const [
    { appStatusState, authState, substancesState },
    initialDispatch,
  ] = React.useReducer<RootReducerType>(rootReducer, combinedInitialState);
  const dispatch = dispatchMiddleware(initialDispatch, api);
  const {
    errorStatus,
    isRequestLoading,
    isSessionChecking,
    modalWindowStatus,
  } = React.useMemo(() => appStatusState, [appStatusState]);
  const { authorizationStatus, csrfToken } = React.useMemo(() => authState, [
    authState,
  ]);
  const {
    locationCollection,
    queryStringData,
    substanceList,
    substanceToEdit,
    substancesToShow,
  } = React.useMemo(() => substancesState, [substancesState]);

  const resetModalWindow = React.useCallback(() => {
    dispatch(
      appStatusActionCreators.setModalWindowStatus(ModalWindowStatus.NONE)
    );
    dispatch(substanceActionCreators.setSubstanceToEdit(null));
    dispatch(appStatusActionCreators.setErrorStatus(ErrorStatus.OK));
  }, []);

  React.useEffect(() => {
    const checkSessionAndLoadSubstances = async () => {
      await dispatch(authActionCreators.checkSession());
      await dispatch(substanceActionCreators.loadFullSubstanceList());
    };

    checkSessionAndLoadSubstances();
  }, []);

  React.useEffect(() => {
    const querryNewData = async () => {
      if (isSessionChecking) {
        return;
      }
      if (
        queryStringData.search.value.length !== 0 ||
        queryStringData.locations.length !== 0
      ) {
        await dispatch(substanceActionCreators.querryNewData(queryStringData));
      }
      if (
        queryStringData.search.value.length === 0 &&
        queryStringData.locations.length === 0
      ) {
        await dispatch(substanceActionCreators.loadFullSubstanceList());
      }
      dispatch(substanceActionCreators.resetSubstanceToShowCount());
    };

    querryNewData();
  }, [queryStringData]);

  const renderApp = () => {
    if (isSessionChecking) {
      return (
        <div className="message-block">
          <h1>Пожалуйста, подождите, идет процесс аутентификации.</h1>
          <div className="lds-facebook">
            <div />
            <div />
            <div />
          </div>
        </div>
      );
    }

    if (authorizationStatus === AuthorizationStatus.AUTH) {
      const modalWindowList = {
        [ModalWindowStatus.CREATE]: (
          <CreateWindow
            locationCollection={locationCollection}
            resetModalWindow={resetModalWindow}
            substanceToEdit={null}
            csrfToken={csrfToken}
            substanceList={substanceList}
            type={ModalWindowStatus.CREATE}
            dispatch={dispatch}
          />
        ),
        [ModalWindowStatus.DELETE]: (
          <DeleteConfirmWindow
            substance={substanceToEdit}
            resetModalWindow={resetModalWindow}
            csrfToken={csrfToken}
            dispatch={dispatch}
            substanceList={substanceList}
          />
        ),
        [ModalWindowStatus.EDIT]: (
          <CreateWindow
            locationCollection={locationCollection}
            substanceToEdit={substanceToEdit}
            dispatch={dispatch}
            type={ModalWindowStatus.EDIT}
            substanceList={substanceList}
            csrfToken={csrfToken}
            resetModalWindow={resetModalWindow}
          />
        ),
        [ModalWindowStatus.NONE]: null,
      };

      return (
        <>
          {modalWindowList[modalWindowStatus]}
          <SearchBar
            searchSelectValue={queryStringData.search.type}
            searchInputValue={queryStringData.search.value}
            errorStatus={errorStatus}
            dispatch={dispatch}
          />
          <FilterBar
            locationCollection={locationCollection}
            errorStatus={errorStatus}
            dispatch={dispatch}
            chosenLocations={queryStringData.locations}
          />
          <context.Provider value={dispatch}>
            <SubstanceList
              errorStatus={errorStatus}
              isRequestLoading={isRequestLoading}
              dispatch={dispatch}
              substancesToRender={[...substanceList].splice(
                0,
                substancesToShow
              )}
              isSubstancesLeft={substancesToShow <= substanceList.length}
            />
          </context.Provider>
        </>
      );
    }

    if (authorizationStatus === AuthorizationStatus.NO_AUTH) {
      return (
        <SignIn
          errorStatus={errorStatus}
          isRequestLoading={isRequestLoading}
          dispatch={dispatch}
          csrfToken={csrfToken}
        />
      );
    }

    return <p>Что-то пошло не так</p>;
  };

  return renderApp();
};

export default App;
