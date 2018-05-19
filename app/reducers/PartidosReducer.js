import {
  RESET_DETALLE_QUINIELA,
  BUSCAR_PARTIDOS_EXITO,
  MODIFICAR_APUESTAS,
  RESET_DETALLE_QUINIELA_PA
} from "../actions/types";

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case BUSCAR_PARTIDOS_EXITO:
      return action.payload;

    case RESET_DETALLE_QUINIELA_PA:
      return {
        ...INITIAL_STATE
      };

    default:
      return state;
  }
};
