import * as React from 'react';
import { ErrorStatus } from '../../types';

interface Props {
  onSearchBarChahge: (changeableInput: 'select' | 'input', value: string) => void,
  searchSelectValue: string,
  searchInputValue: string,
  errorStatus: ErrorStatus,
  isSubstancesLoading: boolean
}

const SearchBar: React.FC<Props> = (props: Props) => {
  const {
    onSearchBarChahge, searchSelectValue, searchInputValue, errorStatus, isSubstancesLoading,
  } = props;
  return (
    <nav className="navbar navbar-light bg-light">
      <span className="navbar-brand font-weight-bold">Лаборатория СМАРТ-НАНОСИСТЕМ</span>
      <form
        className="form-inline"
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => e.preventDefault()}
      >
        <select
          style={{ marginRight: '20px' }}
          required
          disabled={errorStatus === ErrorStatus.LOADING_FAILED || isSubstancesLoading}
          value={searchSelectValue === 'casNumber' ? 'CAS RN' : 'Название'}
          className="form-control"
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
            const value = e.target.value === 'CAS RN' ? 'casNumber' : 'name';
            onSearchBarChahge('select', value);
          }}
        >
          <option>CAS RN</option>
          <option>Название</option>
        </select>
        <input
          className="form-control mr-sm-2"
          type="search"
          style={{ width: '400px' }}
          placeholder="Поиск"
          aria-label="Search"
          disabled={errorStatus === ErrorStatus.LOADING_FAILED || isSubstancesLoading}
          value={searchInputValue}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            onSearchBarChahge('input', e.target.value);
          }}
        />
      </form>
    </nav>
  );
};

export default SearchBar;
