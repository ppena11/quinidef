import { NavigationActions } from "react-navigation";
import RootNavigatort from "../config/routest";

import {
  GO_TO_APUESTAS,
  GO_TO_POSICIONES,
  GO_TO_REGLAS,
  GO_TO_MAS
} from "../actions/types";

const initialState = RootNavigatort.router.getStateForAction(
  NavigationActions.init()
);

export default (state = initialState, action) => {
  let nextState;
  switch (action.type) {
    case GO_TO_APUESTAS:
      nextState = RootNavigatort.router.getStateForAction(
        NavigationActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({ routeName: "Apuestas" })],
          key: null
        }),
        state
      );
      break;

    case GO_TO_POSICIONES:
      nextState = RootNavigatort.router.getStateForAction(
        NavigationActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({ routeName: "Posiciones" })],
          key: null
        }),
        state
      );
      break;

    case GO_TO_REGLAS:
      nextState = RootNavigatort.router.getStateForAction(
        NavigationActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({ routeName: "Reglas" })],
          key: null
        }),
        state
      );
      break;
    case GO_TO_MAS:
      nextState = RootNavigatort.router.getStateForAction(
        NavigationActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({ routeName: "Mas" })],
          key: null
        }),
        state
      );
      break;

    default:
      nextState = RootNavigatort.router.getStateForAction(action, state);
      break;
  }

  // Simply return the original `state` if `nextState` is null or undefined.
  return nextState || state;
};
