import combineReducers from 'react-combine-reducers';
import { authReducer, authInitialState } from '../auth/authReducer';
import {
  appStatusReducer,
  appStatusInitialState,
} from '../appStatus/appStatusReducer';
import {
  substanceReducer,
  substanceInitialState,
} from '../substance/substanceReducer';
import { RootReducerType } from './types';

const [rootReducer, combinedInitialState] = combineReducers<RootReducerType>({
  authState: [authReducer, authInitialState],
  appStatusState: [appStatusReducer, appStatusInitialState],
  substancesState: [substanceReducer, substanceInitialState],
});

export { rootReducer, combinedInitialState };
