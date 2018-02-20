import {
  ULTIMA_QUINIELA_UPDATE,
  ULTIMA_QUINIELA_LLEGO,
  RESET_QUINIELAS_ADMIN,
} from '../actions/types';

const INITIAL_STATE = { last: '', ultima: 'no' };

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ULTIMA_QUINIELA_UPDATE:
      return { ...state, last: action.payload };

    case ULTIMA_QUINIELA_LLEGO:
      return { ...state, ultima: 'yes' };

    case RESET_QUINIELAS_ADMIN:
      return {
        ...state,
        ...INITIAL_STATE,
      };

    default:
      return state;
  }
};
