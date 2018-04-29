import { QUINIELA_UPDATE, BUSCAR_QUINIELAS_EXITO } from '../actions/types';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case QUINIELA_UPDATE:
      return { ...state, [action.payload.prop]: action.payload.value };

    case BUSCAR_QUINIELAS_EXITO:
      return action.payload;

    default:
      return state;
  }
};
