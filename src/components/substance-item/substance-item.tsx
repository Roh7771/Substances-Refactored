import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { SubstanceType } from '../../types';
import { EMPTY_FIELD_VALUE, ModalWindowStatus } from '../../const';
import context from '../../context';
import { substanceActionCreators } from '../../reducer/substance/substanceReducer';
import { appStatusActionCreators } from '../../reducer/appStatus/appStatusReducer';

type Props = {
  substance: SubstanceType;
};

const SubstanceItem: React.FC<Props> = React.memo(
  (props: Props) => {
    const { substance } = props;
    const dispatch = React.useContext(context);

    const onEditButtonClick = (substanceToEdit: SubstanceType) => {
      dispatch(substanceActionCreators.setSubstanceToEdit(substanceToEdit));
      dispatch(
        appStatusActionCreators.setModalWindowStatus(ModalWindowStatus.EDIT),
      );
    };

    const onDeleteButtonClick = (substanceToDelete: SubstanceType) => {
      dispatch(substanceActionCreators.setSubstanceToEdit(substanceToDelete));
      dispatch(
        appStatusActionCreators.setModalWindowStatus(ModalWindowStatus.DELETE),
      );
    };

    return (
      <tr>
        <th className="align-middle" scope="row">
          {substance.number}
        </th>
        <td className="align-middle">{substance.name}</td>
        <td className="align-middle">
          {substance.amount ? substance.amount : EMPTY_FIELD_VALUE}
        </td>
        <td className="align-middle">{substance.location}</td>
        <td className="align-middle">{substance.place}</td>
        <td className="align-middle">
          {substance.company ? substance.company : EMPTY_FIELD_VALUE}
        </td>
        <td className="align-middle">
          {substance.casNumber ? substance.casNumber : EMPTY_FIELD_VALUE}
        </td>
        <td className="d-flex flex-column justify-content-center align-items-center">
          <button
            type="button"
            className="btn btn-primary mb-1"
            onClick={() => onEditButtonClick(substance)}
          >
            <FontAwesomeIcon icon={faPen} />
          </button>
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => onDeleteButtonClick(substance)}
          >
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </td>
      </tr>
    );
  },
  (prev, next) => {
    const prevValues = Object.values(prev.substance);
    const nextValues = Object.values(next.substance);
    for (let i = 0; i < prevValues.length; i += 1) {
      if (prevValues[i] !== nextValues[i]) {
        return false;
      }
    }
    return true;
  },
);

export default SubstanceItem;
