import * as React from 'react';
import { SubstanceType } from '../../types';
import { CombinedActionTypes } from '../../reducer/rootReducer/types';
import api from '../../api';
import findAndDeleteSubstance from '../../utils/findAndDeleteSubstance';
import { substanceActionCreators } from '../../reducer/substance/substanceReducer';

interface Props {
  substance: SubstanceType | null,
  resetModalWindow: () => void,
  csrfToken: string,
  dispatch: React.Dispatch<CombinedActionTypes>,
  substanceList: SubstanceType[]
}

const DeleteConfirmWindow: React.FC<Props> = (props: Props) => {
  const {
    substance, dispatch, resetModalWindow, csrfToken, substanceList,
  } = props;

  const onDeleteConfirmClick = async(substanceToDelete: SubstanceType) => {
    await api.request({
      method: 'DELETE',
      url: `/substances/${substanceToDelete._id}`,
      data: {
        _csrf: csrfToken,
      },
    });
    dispatch(substanceActionCreators.setSubstanceList(findAndDeleteSubstance(substanceList, substanceToDelete)));
    resetModalWindow();
  };

  const onCloseButtonClick = () => {
    resetModalWindow();
  };

  return (
    <div className="delete-confirm-field">
      <div className="delete-confirm-field__modal">
        <h2 className="delete-confirm-field__text">Вы уверены, что хотите удалить этот реактив из базы данных?</h2>
        <div className="delete-confirm-field__buttons">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => onDeleteConfirmClick(substance as SubstanceType)}
          >
            Да
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => onCloseButtonClick()}
          >
            Нет
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmWindow;
