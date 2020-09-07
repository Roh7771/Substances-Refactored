import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { SubstanceType } from '../../types';
import SubstanceItem from '../substance-item/substance-item';
import errorImg from '../../images/loading-error-img.jpg';
import emptyListImg from '../../images/empty-list-img.jpg';
import { CombinedActionTypes } from '../../reducer/rootReducer/types';
import { appStatusActionCreators } from '../../reducer/appStatus/appStatusReducer';
import { ErrorStatus, ModalWindowStatus } from '../../const';
import { substanceActionCreators } from '../../reducer/substance/substanceReducer';

type Props = {
  errorStatus: ErrorStatus;
  isRequestLoading: boolean;
  dispatch: React.Dispatch<CombinedActionTypes>;
  substancesToRender: SubstanceType[];
  isSubstancesLeft: boolean;
};

const SubstanceList: React.FC<Props> = React.memo((props: Props) => {
  const {
    errorStatus,
    isRequestLoading,
    dispatch,
    substancesToRender,
    isSubstancesLeft,
  } = props;

  const handleCreateButtonClick = React.useCallback(() => {
    dispatch(
      appStatusActionCreators.setModalWindowStatus(ModalWindowStatus.CREATE),
    );
  }, []);

  const addNewSubstances = React.useCallback(() => {
    const windowHeight = document.documentElement.clientHeight;
    const scrollHeight = Math.max(
      document.body.scrollHeight,
      document.documentElement.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.offsetHeight,
      document.body.clientHeight,
      document.documentElement.clientHeight,
    );
    if (
      windowHeight + window.pageYOffset > scrollHeight - 50
      && isSubstancesLeft
    ) {
      dispatch(substanceActionCreators.addSubstanceToShowCount());
    }
  }, [isSubstancesLeft]);

  const loadingErrorMessage = React.useMemo(
    () => (
      <div className="message-block">
        <h1>
          К сожалению, не удалось подключиться к базе данных.
          <br />
          Обратитесь к Роману как можно быстрее!
        </h1>
        <img src={errorImg} alt="Ошибка загрузки" />
      </div>
    ),
    [],
  );

  const emptyListMessage = React.useMemo(
    () => (
      <div className="message-block">
        <h1>К сожалению, ничего не найдено.</h1>
        <img src={emptyListImg} alt="Ничего не найдено" />
      </div>
    ),
    [],
  );

  React.useEffect(() => {
    window.addEventListener('scroll', addNewSubstances);
    return () => {
      window.removeEventListener('scroll', addNewSubstances);
    };
  }, [addNewSubstances]);

  const mainContent = React.useMemo(
    () => (
      <>
        <table className="table mb-0">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Название</th>
              <th scope="col">Количество</th>
              <th scope="col">Лаборатория</th>
              <th scope="col">Место</th>
              <th scope="col">Фирма</th>
              <th scope="col">CAS</th>
              <th scope="col" />
            </tr>
          </thead>
          <tbody>
            {substancesToRender.map(sub => (
              <SubstanceItem substance={sub} key={sub._id} />
            ))}
          </tbody>
        </table>
        <button
          type="button"
          className="btn btn-primary create-button"
          onClick={() => handleCreateButtonClick()}
        >
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </>
    ),
    [substancesToRender],
  );

  const requestLoadingBlock = React.useMemo(
    () => (
      <div className="lds-ring mt-5 mx-auto d-block">
        <div />
        <div />
        <div />
        <div />
      </div>
    ),
    [],
  );

  if (isRequestLoading) {
    return requestLoadingBlock;
  }

  if (errorStatus === ErrorStatus.LOADING_FAILED) {
    return loadingErrorMessage;
  }

  if (substancesToRender.length === 0) {
    return emptyListMessage;
  }

  return mainContent;
});

export default SubstanceList;
