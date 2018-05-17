import {
  RESET_DETALLE_QUINIELA_AP,
  BUSCAR_DETALLE_APUESTAS_EXITO
} from "../actions/types";

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  /*   console.log(action.payload);
    //console.log(action.payload.key);
    //console.log(action.payload.value.key); */
  switch (action.type) {
    case BUSCAR_DETALLE_APUESTAS_EXITO:
      return {
        ...INITIAL_STATE,
        ...action.payload
      };

    case RESET_DETALLE_QUINIELA_AP:
      return {
        ...INITIAL_STATE
      };

    default:
      return state;
  }
};
