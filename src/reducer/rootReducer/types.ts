import { AuthStateType, AuthActionTypes } from '../auth/types';
import { AppStatusStateType, AppStatusActionTypes } from '../appStatus/types';
import { SubstanceStateType, SubstanceActionTypes } from '../substance/types';

export type CombinedInitialState = {
  authState: AuthStateType,
  appStatusState: AppStatusStateType,
  substancesState: SubstanceStateType,
}

export type CombinedActionTypes = AuthActionTypes | AppStatusActionTypes | SubstanceActionTypes

export type RootReducerType = (state: CombinedInitialState, action: CombinedActionTypes) => CombinedInitialState
