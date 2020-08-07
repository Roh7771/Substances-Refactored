import * as React from 'react';
import api from '../../api';
import {
  SubstanceType,
  ErrorStatus,
  AuthorizationStatus,
  LoginDataType,
  LocationCollectionType,
  ModalWindowStatus,
} from '../../types';
import SubstanceList from '../substance-list/substance-list';
import CreateWindow from '../create-window/create-window';
import createLocationCollection from '../../utils/createLocationCollection';
import findAndUpdateSubstance from '../../utils/findAndUpdateSubstance';
import DeleteConfirmWindow from '../delete-confirm-window/delete-confirm-window';
import findAndDeleteSubstance from '../../utils/findAndDeleteSubstance';
import SearchBar from '../search-bar/search-bar';
import buildQueryString from '../../utils/buildQueryString';
import FilterBar from '../filter-bar/filter-bar';
import SignIn from '../sign-in/sign-in';
import { SUBSTANCE_TO_SHOW_AMOUNT } from '../../const';
import { substanceActionCreators } from '../../reducer/substance/substanceReducer';
import { rootReducer, combinedInitialState } from '../../reducer/rootReducer/rootReducer';
import { RootReducerType } from '../../reducer/rootReducer/types';
import { authActionCreators } from '../../reducer/auth/authReducer';
import { appStatusActionCreators } from '../../reducer/appStatus/appStatusReducer';
import context from '../../context';

type Props = {};

type AllSubstancesServerResponseType = {
  substances: SubstanceType[];
}

type CSRFTokenServerResponseType = {
  csrfToken: string
}

type OneSubstanceServerResponseType = {
  substance: SubstanceType;
}

const App: React.FC<Props> = () => {
  const [
    { appStatusState, authState, substancesState }, dispatch,
  ] = React.useReducer<RootReducerType>(rootReducer, combinedInitialState);
  const {
    errorStatus, isRequestLoading, isSessionChecking, modalWindowStatus,
  } = appStatusState;
  const { authorizationStatus, csrfToken } = authState;
  const {
    isSubstancesLoading, locationCollection, queryStringData, substanceList, substanceToEdit, substancesToShow,
  } = substancesState;

  const requestFullSubstancesList = React.useCallback(async() => {
    try {
      const { data: substancesData } = await api.request<AllSubstancesServerResponseType>({
        url: '/substances',
      });

      dispatch(substanceActionCreators.setLocationCollection(
        createLocationCollection(substancesData.substances),
      ));
      dispatch(substanceActionCreators.setSubstanceList(substancesData.substances));
    } catch (err) {
      dispatch(appStatusActionCreators.setErrorStatus(ErrorStatus.LOADING_FAILED));
    }
  }, []);
  React.useEffect(() => console.log('callback changed'), [requestFullSubstancesList]);

  const resetModalWindow = React.useCallback(() => {
    dispatch(appStatusActionCreators.setModalWindowStatus(ModalWindowStatus.NONE));
    dispatch(substanceActionCreators.setSubstanceToEdit(null));
    dispatch(appStatusActionCreators.setErrorStatus(ErrorStatus.OK));
  }, []);

  React.useEffect(() => {
    const checkSession = async() => {
      try {
        const { data: tokenData } = await api.request<CSRFTokenServerResponseType>({
          url: '/users/login',
        });
        dispatch(authActionCreators.setCsrfToken(tokenData.csrfToken));
        dispatch(authActionCreators.setAuthorizationStatus(AuthorizationStatus.AUTH));
      } catch (res) {
        dispatch(authActionCreators.setCsrfToken(res.response.data.csrfToken));
      } finally {
        dispatch(appStatusActionCreators.setSessionCheckingStatus(false));
      }

      return true;
    };

    const checkSessionAndLoadSubstances = async() => {
      if (await checkSession()) {
        await requestFullSubstancesList();
        dispatch(substanceActionCreators.setSubstancesLoadingStatus(false));
      }
    };

    checkSessionAndLoadSubstances();
  }, []);

  React.useEffect(() => {
    dispatch(appStatusActionCreators.setRequestLoadingStatus(false));
    dispatch(substanceActionCreators.setSubstanceToShowCount(SUBSTANCE_TO_SHOW_AMOUNT));
  }, [substanceList]);

  React.useEffect(() => {
    const querryNewData = async() => {
      if (isSubstancesLoading) {
        return;
      }
      if (queryStringData.search.value.length !== 0 || queryStringData.locations.length !== 0) {
        dispatch(appStatusActionCreators.setRequestLoadingStatus(true));
        try {
          const { data: querriedData } = await api.request<AllSubstancesServerResponseType>({
            method: 'GET',
            url: `/substances/?${buildQueryString(queryStringData)}`,
          });
          dispatch(substanceActionCreators.setSubstanceList(querriedData.substances));
        } catch (error) {
          dispatch(appStatusActionCreators.setErrorStatus(ErrorStatus.LOADING_FAILED));
        }
      }
      if (queryStringData.search.value.length === 0 && queryStringData.locations.length === 0) {
        dispatch(appStatusActionCreators.setRequestLoadingStatus(true));
        await requestFullSubstancesList();
      }
    };

    querryNewData();
  }, [queryStringData]);

  const handleCreateButtonClick = (): void => {
    setCreateWindowVisibility(true);
  };

  const handleSearchBarChange = (
    changeableInput: 'select' | 'input',
    value: string,
  ): void => {
    const newSearchData = { ...queryStringData.search };
    switch (changeableInput) {
      case 'select':
        newSearchData.type = value;
        break;
      case 'input':
        newSearchData.value = value;
        break;
      default:
        dispatch(
          substanceActionCreators.setQueryStringData(queryStringData),
        );
        return;
    }
    dispatch(
      substanceActionCreators.setQueryStringData({
        ...queryStringData,
        search: {
          ...newSearchData,
        },
      }),
    );
  };

  const handleLoginButtonClick = (loginData: LoginDataType): void => {
    setRequestLoadingStatus(true);
    api
      .request({
        method: 'POST',
        url: '/users/login',
        data: {
          ...loginData,
          _csrf: csrfToken,
        },
      })
      .then(() => {
        setAuthorizationStatus(AuthorizationStatus.AUTH);
        setErrorStatus(ErrorStatus.OK);
        setRequestLoadingStatus(false);
        api
          .request<AllSubstancesServerResponseType>({
            url: '/substances',
          })
          .then(response => {
            const { data } = response;
            const { substances } = data;
            dispatch(
              substanceActionCreators.setLocationCollection(
                createLocationCollection(substances),
              ),
            );
            dispatch(
              substanceActionCreators.setSubstanceList(substances),
            );
            dispatch(
              substanceActionCreators.setSubstancesLoadingStatus(false),
            );
          })
          .catch(() => {
            setErrorStatus(ErrorStatus.LOADING_FAILED);
            dispatch(
              substanceActionCreators.setSubstancesLoadingStatus(false),
            );
          });
      })
      .catch(() => {
        setRequestLoadingStatus(false);
        setErrorStatus(ErrorStatus.WRONG_LOGIN_DATA);
      });
  };

  const handleCheckboxChange = (value: number): void => {
    const newLocationsArray = [...queryStringData.locations];
    const index = queryStringData.locations.findIndex(el => el === value);
    if (index !== -1) {
      newLocationsArray.splice(index, 1);
    } else {
      newLocationsArray.push(value);
    }
    dispatch(
      substanceActionCreators.setQueryStringData({
        ...queryStringData,
        locations: newLocationsArray,
      }),
    );
  };

  const handleShowMoreButtonClick = (): void => {
    dispatch(
      substanceActionCreators.setSubstanceToShowCount(
        substanceToShow + SUBSTANCE_TO_SHOW_AMOUNT,
      ),
    );
  };

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
      return (
        <>
          {isCreateWindowVisible ? (
            <CreateWindow
              locationCollection={locationCollection}
              setLocationCollection={(collection: LocationCollectionType) => {
                dispatch(
                  substanceActionCreators.setLocationCollection(collection),
                );
              }}
              resetModalWindow={resetModalWindow}
              substanceToEdit={null}
              onConfirmClick={handleCreateConfirmClick}
              errorStatus={errorStatus}
            />
          ) : null}
          {isEditWindowVisible ? (
            <CreateWindow
              locationCollection={locationCollection}
              setLocationCollection={(collection: LocationCollectionType) => {
                dispatch(
                  substanceActionCreators.setLocationCollection(collection),
                );
              }}
              onCloseButtonClick={handleCloseButtonClick}
              substanceToEdit={substanceToEdit}
              onConfirmClick={handleUpdateButtonClick}
              errorStatus={errorStatus}
            />
          ) : null}
          {isDeleteWindowVisible ? (
            <DeleteConfirmWindow
              substance={substanceToEdit}
              resetModalWindow={resetModalWindow}
            />
          ) : null}
          <SearchBar
            searchSelectValue={queryStringData.search.type}
            searchInputValue={queryStringData.search.value}
            onSearchBarChahge={handleSearchBarChange}
            errorStatus={errorStatus}
            isSubstancesLoading={isSubstancesLoading}
          />
          <FilterBar
            locationCollection={locationCollection}
            onCheckboxChange={handleCheckboxChange}
            checkedLocations={queryStringData.locations}
            errorStatus={errorStatus}
            isSubstancesLoading={isSubstancesLoading}
          />
          <context.Provider value={{ dispatch }}>
            <SubstanceList
              onEditButtonClick={handleEditButtonClick}
              onDeleteButtonClick={handleDeleteButtonClick}
              substanceList={substanceList}
              onCreateButtonClick={handleCreateButtonClick}
              errorStatus={errorStatus}
              isSubstancesLoading={isSubstancesLoading}
              substanceToShow={substanceToShow}
              isRequestLoading={isRequestLoading}
              onShowMoreButtonClick={handleShowMoreButtonClick}
              dispatch={dispatch}
            />
          </context.Provider>
        </>
      );
    }

    if (authorizationStatus === AuthorizationStatus.NO_AUTH) {
      return (
        <SignIn
          onLoginButtonClick={handleLoginButtonClick}
          errorStatus={errorStatus}
          isRequestLoading={isRequestLoading}
        />
      );
    }

    return <p>Что-то пошло не так</p>;
  };

  return renderApp();
};

export default App;
