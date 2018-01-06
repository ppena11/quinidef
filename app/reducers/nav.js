import { NavigationActions } from 'react-navigation';
import RootNavigator from '../config/routes';

import {
  GO_TO_MAIN,
  GO_TO_EMAIL_CONFIRMATION,
  GO_TO_HOME,
  GO_TO_CREAR_CUENTA,
  GO_TO_REINICIAR_CUENTA,
} from '../actions/types';

const initialState = RootNavigator.router.getStateForAction(NavigationActions.init());

export default (state = initialState, action) => {
  let nextState;
  switch (action.type) {
    case GO_TO_MAIN:
      nextState = RootNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'Log' }),
        state,
      );
      break;
    case GO_TO_EMAIL_CONFIRMATION:
      nextState = RootNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'ConfirmacionCorreo' }),
        state,
      );
      break;

    case GO_TO_CREAR_CUENTA:
      nextState = RootNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'CrearCuenta' }),
        state,
      );
      break;

    case GO_TO_REINICIAR_CUENTA:
      nextState = RootNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'ReiniciarContrasena' }),
        state,
      );
      break;

    case GO_TO_HOME:
      nextState = RootNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'Home' }),
        state,
      );
      break;
    case 'Logout':
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
