import { BUSCAR_PARTIDOS_EXITO, MODIFICAR_APUESTAS } from '../actions/types';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case BUSCAR_PARTIDOS_EXITO:
      return action.payload;

    case MODIFICAR_APUESTAS:
      return action.payload;

    default:
      return state;
  }
};
