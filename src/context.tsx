import * as React from 'react';
import { CombinedActionTypes } from './reducer/rootReducer/types';

type defaultContextValueType = {
  dispatch: React.Dispatch<CombinedActionTypes>,
}

export default React.createContext<defaultContextValueType>({ dispatch: () => null });
