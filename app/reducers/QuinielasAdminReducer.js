import {
  QUINIELA_UPDATE,
  BUSCAR_QUINIELAS_ADMINISTRADAS_EXITO,
  RESET_QUINIELAS_ADMIN,
} from '../actions/types';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case QUINIELA_UPDATE:
      return { ...state, [action.payload.prop]: action.payload.value };

    case BUSCAR_QUINIELAS_ADMINISTRADAS_EXITO:
      return { ...state, ...action.payload };

    case RESET_QUINIELAS_ADMIN:
      return { ...INITIAL_STATE };

    default:
      return state;
  }
};
