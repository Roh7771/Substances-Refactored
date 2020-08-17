import * as React from 'react';
import { CombinedActionTypes } from './reducer/rootReducer/types';

export default React.createContext<React.Dispatch<CombinedActionTypes>>(() => null);
