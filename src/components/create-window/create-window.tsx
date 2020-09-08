import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faPlus } from '@fortawesome/free-solid-svg-icons';
import { SubstanceType, LocationCollectionType } from '../../types';
import { CombinedActionTypes } from '../../reducer/rootReducer/types';
import { substanceActionCreators } from '../../reducer/substance/substanceReducer';
import { ModalWindowStatus } from '../../const';

type Props = {
  substanceToEdit: SubstanceType | null;
  resetModalWindow: () => void;
  locationCollection: LocationCollectionType;
  type: ModalWindowStatus.EDIT | ModalWindowStatus.CREATE;
  csrfToken: string;
  dispatch: (action: CombinedActionTypes) => void | Promise<void>;
  substanceList: SubstanceType[];
};

const CreateWindow: React.FC<Props> = React.memo(
  ({
    substanceToEdit,
    locationCollection,
    resetModalWindow,
    type,
    csrfToken,
    dispatch,
    substanceList,
  }: Props) => {
    const [isNewPlace, setNewPlaceStatus] = React.useState<boolean>(false);
    const [isNewLocation, setNewLocationStatus] = React.useState<boolean>(
      false,
    );
    const [chosenLocation, setChosenLocation] = React.useState<number>(
      substanceToEdit ? substanceToEdit.location : 111,
    );

    const handleCloseButtonClick = React.useCallback(() => {
      resetModalWindow();
    }, []);

    const handleConfirmClick = React.useCallback(
      async (substance: SubstanceType) => {
        switch (type) {
          case ModalWindowStatus.EDIT:
            await dispatch(
              substanceActionCreators.updateSubstance(
                substance,
                substanceList,
                csrfToken,
              ),
            );
            resetModalWindow();
            break;

          case ModalWindowStatus.CREATE:
            await dispatch(
              substanceActionCreators.createSubstance(
                substance,
                substanceList,
                csrfToken,
              ),
            );
            resetModalWindow();
            break;

          default:
            break;
        }
      },
      [csrfToken],
    );

    const numberInputEl = React.useRef<HTMLInputElement>(null);
    const nameInputEl = React.useRef<HTMLInputElement>(null);
    const amountInputEl = React.useRef<HTMLInputElement>(null);
    const locationTextInputEl = React.useRef<HTMLInputElement>(null);
    const locationSelectInputEl = React.useRef<HTMLSelectElement>(null);
    const placeSelectInputEl = React.useRef<HTMLSelectElement>(null);
    const placeTextInputEl = React.useRef<HTMLInputElement>(null);
    const casNumberInputEl = React.useRef<HTMLInputElement>(null);
    const companyInputEl = React.useRef<HTMLInputElement>(null);

    React.useEffect(() => {
      if (locationTextInputEl.current) {
        locationTextInputEl.current.focus();
      }
      if (placeTextInputEl.current && !isNewLocation) {
        placeTextInputEl.current.focus();
      }
    }, [isNewPlace, isNewLocation]);

    return (
      <div className="edit-field">
        <form
          className="edit-field__form"
          onSubmit={async (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            if (isNewPlace) {
              const newLocationCollection = new Map(locationCollection);

              if (isNewLocation) {
                newLocationCollection.set(
                  Number(locationTextInputEl.current?.value),
                  new Set<string>().add(
                    placeTextInputEl.current?.value as string,
                  ),
                );
              }

              if (!isNewLocation) {
                const places = newLocationCollection.get(chosenLocation);
                if (places) {
                  places.add(placeTextInputEl.current?.value as string);
                }
              }

              dispatch(
                substanceActionCreators.setLocationCollection(
                  newLocationCollection,
                ),
              );
            }
            const substanceData: SubstanceType = {
              name: nameInputEl.current?.value as string,
              number: Number(numberInputEl.current?.value) as number,
              location: isNewLocation
                ? Number(locationTextInputEl.current?.value)
                : Number(locationSelectInputEl.current?.value),
              place: isNewPlace
                ? (placeTextInputEl.current?.value as string)
                : (placeSelectInputEl.current?.value as string),
              amount: amountInputEl.current?.value,
              casNumber: casNumberInputEl.current?.value,
              company: companyInputEl.current?.value,
            };
            if (substanceToEdit) {
              substanceData._id = substanceToEdit._id;
            }
            await handleConfirmClick(substanceData);
          }}
        >
          <div className="form-group">
            <label htmlFor="number">Номер</label>
            <input
              ref={numberInputEl}
              defaultValue={substanceToEdit ? substanceToEdit.number : ''}
              required
              type="number"
              className="form-control"
              id="number"
              placeholder="Введите номер"
            />
          </div>
          <div className="form-group">
            <label htmlFor="name">Название</label>
            <input
              ref={nameInputEl}
              defaultValue={substanceToEdit ? substanceToEdit.name : ''}
              required
              type="text"
              className="form-control"
              id="name"
              placeholder="Введите название"
            />
          </div>
          <div className="form-group">
            <label htmlFor="amount">Количество</label>
            <input
              ref={amountInputEl}
              defaultValue={substanceToEdit ? substanceToEdit.amount : ''}
              type="text"
              className="form-control"
              id="amount"
              placeholder="Введите количество"
            />
          </div>
          <div className="form-group">
            <label htmlFor="location">Лаборатория</label>
            <div className="d-flex">
              {isNewLocation ? (
                <input
                  ref={locationTextInputEl}
                  className="form-control mr-3"
                  placeholder="Введите номер новой лаборатории"
                  type="number"
                  required
                  id="location"
                />
              ) : (
                <select
                  ref={locationSelectInputEl}
                  defaultValue={
                    substanceToEdit ? substanceToEdit.location : 111
                  }
                  required
                  className="form-control mr-3"
                  id="location"
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                    setChosenLocation(Number(e.target.value));
                  }}
                >
                  {[...locationCollection.keys()].map((location, i) => (
                    <option key={`${i + 1}-${location}`}>{location}</option>
                  ))}
                </select>
              )}
              <button
                type="button"
                className="btn btn-primary"
                onClick={() =>
                  setNewLocationStatus(prevState => {
                    if (prevState !== true) {
                      setNewPlaceStatus(true);
                      return true;
                    }
                    setNewPlaceStatus(false);
                    return false;
                  })}
              >
                <FontAwesomeIcon icon={isNewLocation ? faTimes : faPlus} />
              </button>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="place">Место</label>
            <div className="d-flex">
              {isNewPlace ? (
                <input
                  ref={placeTextInputEl}
                  className="form-control mr-3"
                  placeholder="Введите название нового места"
                  type="text"
                  required
                  id="place"
                />
              ) : (
                <select
                  ref={placeSelectInputEl}
                  defaultValue={substanceToEdit ? substanceToEdit.place : ''}
                  required
                  className="form-control mr-3"
                  id="place"
                >
                  {[...locationCollection.get(chosenLocation)].map(
                    (place, i) => (
                      <option key={`${i + 1}-${place}`}>{place}</option>
                    ),
                  )}
                </select>
              )}
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => setNewPlaceStatus(prevState => !prevState)}
                disabled={isNewLocation}
              >
                <FontAwesomeIcon icon={isNewPlace ? faTimes : faPlus} />
              </button>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="company">Фирма</label>
            <input
              ref={companyInputEl}
              defaultValue={substanceToEdit ? substanceToEdit.company : ''}
              type="text"
              className="form-control"
              id="company"
              placeholder="Введите фирму"
            />
          </div>
          <div className="form-group">
            <label htmlFor="cas-number">CAS RN</label>
            <input
              ref={casNumberInputEl}
              defaultValue={substanceToEdit ? substanceToEdit.casNumber : ''}
              type="text"
              className="form-control"
              id="cas-number"
              placeholder="Введите CAS-номер"
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Принять
          </button>
          <FontAwesomeIcon
            onClick={() => handleCloseButtonClick()}
            icon={faTimes}
            className="edit-field__close"
          />
        </form>
      </div>
    );
  },
);

export default CreateWindow;
