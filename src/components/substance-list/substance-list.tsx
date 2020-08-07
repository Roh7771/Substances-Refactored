import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { SubstanceType, ErrorStatus } from '../../types';
import SubstanceItem from '../substance-item/substance-item';
import errorImg from '../../images/loading-error-img.jpg';
import emptyListImg from '../../images/empty-list-img.jpg';
import { CombinedActionTypes } from '../../reducer/rootReducer/types';

interface Props {
  substanceList: SubstanceType[],
  onEditButtonClick: (substance: SubstanceType) => void,
  onCreateButtonClick: () => void,
  errorStatus: ErrorStatus,
  isSubstancesLoading: boolean,
  substanceToShow: number,
  isRequestLoading: boolean,
  onShowMoreButtonClick: () => void,
  dispatch: React.Dispatch<CombinedActionTypes>
}

const SubstanceList: React.FC<Props> = (props: Props) => {
  const {
    substanceList,
    onCreateButtonClick,
    errorStatus,
    isSubstancesLoading,
    substanceToShow,
    isRequestLoading,
    onShowMoreButtonClick,
  } = props;

  const substanceToRender = [...substanceList].splice(0, substanceToShow);

  const loadingErrorMessage = (
    <div className="message-block">
      <h1>
        К сожалению, не удалось подключиться к базе данных.
        <br />
        Обратитесь к Роману как можно быстрее!
      </h1>
      <img src={errorImg} alt="Ошибка загрузки" />
    </div>
  );

  const emptyListMessage = (
    <div className="message-block">
      <h1>К сожалению, ничего не найдено.</h1>
      <img src={emptyListImg} alt="Ничего не найдено" />
    </div>
  );

  const mainContent = (
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
          {substanceToRender.map(sub => (
            <SubstanceItem
              substance={sub}
              key={sub._id}
            />
          ))}
        </tbody>
      </table>
      <button
        type="button"
        className="btn btn-primary mx-auto mb-3"
        onClick={() => onShowMoreButtonClick()}
        style={{ display: substanceToShow >= substanceList.length ? 'none' : 'block' }}
      >
        Показать больше результатов
      </button>
      <button
        type="button"
        className="btn btn-primary create-button"
        onClick={() => onCreateButtonClick()}
      >
        <FontAwesomeIcon icon={faPlus} />
      </button>
    </>
  );

  const reagentsLoadingBlock = (
    <div className="message-block">
      <h1>Пожалуйста, подождите, идет загрузка списка реагентов.</h1>
      <div className="lds-facebook">
        <div />
        <div />
        <div />
      </div>
    </div>
  );

  const requestLoadingBlock = (
    <div className="lds-ring mt-5 mx-auto d-block">
      <div />
      <div />
      <div />
      <div />
    </div>
  );

  if (isSubstancesLoading) {
    return reagentsLoadingBlock;
  }

  if (errorStatus === ErrorStatus.LOADING_FAILED) {
    return loadingErrorMessage;
  }

  if (isRequestLoading) {
    return requestLoadingBlock;
  }

  if (substanceList.length === 0) {
    return emptyListMessage;
  }

  return mainContent;
};

export default SubstanceList;
