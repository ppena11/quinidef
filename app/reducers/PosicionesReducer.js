import { BUSCAR_POSICIONES_EXITO } from "../actions/types";

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case BUSCAR_POSICIONES_EXITO:
      return action.payload;

    default:
      return state;
  }
};
