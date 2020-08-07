import * as React from 'react';
import { ErrorStatus, LocationCollectionType } from '../../types';

interface Props {
  onCheckboxChange: (value: number) => void,
  locationCollection: LocationCollectionType,
  checkedLocations: number[],
  errorStatus: ErrorStatus,
  isSubstancesLoading: boolean,
}

const FilterBar: React.FC<Props> = (props: Props) => {
  const {
    locationCollection,
    onCheckboxChange,
    checkedLocations,
    errorStatus,
    isSubstancesLoading,
  } = props;

  return (
    <div
      className="filter-bar"
      style={{ display: ((errorStatus === ErrorStatus.LOADING_FAILED) || isSubstancesLoading) ? 'none' : 'flex' }}
    >
      <h2 className="filter-bar__text">Фильтр по лабораториям:</h2>
      {[...locationCollection.keys()].map((location, i) => (
        <div key={`${i + 1}-${location}`} className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="checkbox"
            checked={checkedLocations.includes(location)}
            id={`lab-${location}`}
            value={location}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              onCheckboxChange(Number(e.target.value));
            }}
          />
          <label
            className="form-check-label"
            htmlFor={`lab-${location}`}
          >
            {location}
          </label>
        </div>
      ))}
    </div>
  );
};

export default FilterBar;
