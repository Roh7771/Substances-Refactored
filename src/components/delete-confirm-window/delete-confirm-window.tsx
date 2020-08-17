import * as React from 'react';
import { SubstanceType } from '../../types';
import { CombinedActionTypes } from '../../reducer/rootReducer/types';
import { substanceActionCreators } from '../../reducer/substance/substanceReducer';

type Props = {
  substance: SubstanceType | null;
  resetModalWindow: () => void;
  csrfToken: string;
  dispatch: (action: CombinedActionTypes) => void | Promise<void>;
  substanceList: SubstanceType[];
};

const DeleteConfirmWindow: React.FC<Props> = (props: Props) => {
  const {
    substance,
    dispatch,
    resetModalWindow,
    csrfToken,
    substanceList,
  } = props;

  const handleDeleteConfirmClick = React.useCallback(
    async (substanceToDelete: SubstanceType) => {
      await dispatch(
        substanceActionCreators.deleteSubstance(
          substanceToDelete,
          substanceList,
          csrfToken,
        ),
      );
      resetModalWindow();
    },
    [csrfToken, substanceList],
  );

  const handleCloseButtonClick = React.useCallback(() => {
    resetModalWindow();
  }, []);

  return (
    <div className="delete-confirm-field">
      <div className="delete-confirm-field__modal">
        <h2 className="delete-confirm-field__text">
          Вы уверены, что хотите удалить этот реактив из базы данных?
        </h2>
        <div className="delete-confirm-field__buttons">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => handleDeleteConfirmClick(substance as SubstanceType)}
          >
            Да
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => handleCloseButtonClick()}
          >
            Нет
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmWindow;
