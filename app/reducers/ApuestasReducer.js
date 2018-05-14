import {
  RESET_DETALLE_QUINIELA,
  BUSCAR_APUESTAS_EXITO,
  MODIFICAR_APUESTAS
} from "../actions/types";

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  /*   console.log(action.payload);
  //console.log(action.payload.key);
  //console.log(action.payload.value.key); */
  switch (action.type) {
    case BUSCAR_APUESTAS_EXITO:
      return action.payload;

    case MODIFICAR_APUESTAS:
      return { ...state, [action.payload.key]: action.payload.value };

    case RESET_DETALLE_QUINIELA:
      return {
        ...INITIAL_STATE
      };

    default:
      return state;
  }
};
