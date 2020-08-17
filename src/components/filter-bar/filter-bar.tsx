import * as React from 'react';
import { LocationCollectionType } from '../../types';
import { CombinedActionTypes } from '../../reducer/rootReducer/types';
import { substanceActionCreators } from '../../reducer/substance/substanceReducer';
import { ErrorStatus } from '../../const';

type Props = {
  locationCollection: LocationCollectionType;
  errorStatus: ErrorStatus;
  dispatch: React.Dispatch<CombinedActionTypes>;
  chosenLocations: number[];
};

const FilterBar: React.FC<Props> = React.memo((props: Props) => {
  const {
    locationCollection,
    errorStatus,
    dispatch,
    chosenLocations,
  } = props;

  const handleCheckboxChange = React.useCallback((value: number): void => {
    const newLocationsArray = [...chosenLocations];
    const index = chosenLocations.findIndex(el => el === value);
    if (index !== -1) {
      newLocationsArray.splice(index, 1);
    } else {
      newLocationsArray.push(value);
    }
    dispatch(substanceActionCreators.setQueryLocationData(newLocationsArray));
  }, [chosenLocations]);

  return (
    <div
      className="filter-bar"
      style={{
        display:
          errorStatus === ErrorStatus.LOADING_FAILED
            ? 'none'
            : 'flex',
      }}
    >
      <h2 className="filter-bar__text">Фильтр по лабораториям:</h2>
      {[...locationCollection.keys()].map((location, i) => (
        <div
          key={`${i + 1}-${location}`}
          className="form-check form-check-inline"
        >
          <input
            className="form-check-input"
            type="checkbox"
            checked={chosenLocations.includes(location)}
            id={`lab-${location}`}
            value={location}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              handleCheckboxChange(Number(e.target.value));
            }}
          />
          <label className="form-check-label" htmlFor={`lab-${location}`}>
            {location}
          </label>
        </div>
      ))}
    </div>
  );
});

export default FilterBar;
