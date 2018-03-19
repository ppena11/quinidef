import { NavigationActions } from 'react-navigation';
import RootNavigator from '../config/routes';

import {
  GO_TO_MAIN,
  GO_TO_EMAIL_CONFIRMATION,
  GO_TO_LOGOUT,
  GO_TO_LOG,
  GO_TO_ADMINISTRADAS,
} from '../actions/types';

const initialState = RootNavigator.router.getStateForAction(NavigationActions.init());

export default (state = initialState, action) => {
  let nextState;
  switch (action.type) {
    case GO_TO_MAIN:
      nextState = RootNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'TusQuinielas' }),
        state,
      );
      break;

    case GO_TO_ADMINISTRADAS:
      nextState = RootNavigator.router.getStateForAction(
        NavigationActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({ routeName: 'QuinielasAdministradas' })],
          key: null,
        }),
        state,
      );
      break;
    case GO_TO_LOG:
      nextState = RootNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'Login' }),
        state,
      );
      break;
    case GO_TO_EMAIL_CONFIRMATION:
      nextState = RootNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'ConfirmacionCorreo' }),
        state,
      );
      break;

    case GO_TO_LOGOUT:
      nextState = RootNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'Login' }),
        state,
      );
      break;
    default:
      nextState = RootNavigator.router.getStateForAction(action, state);
      break;
  }

  // Simply return the original `state` if `nextState` is null or undefined.
  return nextState || state;
};
