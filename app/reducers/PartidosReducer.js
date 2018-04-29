import {
  RESET_DETALLE_QUINIELA,
  BUSCAR_PARTIDOS_EXITO,
  MODIFICAR_APUESTAS,
} from '../actions/types';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case BUSCAR_PARTIDOS_EXITO:
      return action.payload;

    case RESET_DETALLE_QUINIELA:
      return {
        ...INITIAL_STATE,
      };

    default:
      return state;
  }
};
