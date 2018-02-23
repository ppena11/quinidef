import {
  ULTIMA_QUINIELA_UPDATE,
  ULTIMA_QUINIELA_LLEGO,
  RESET_QUINIELAS_ADMIN,
  RELOADED_QUINIELAS_ADMIN,
  ULTIMA_QUINIELA_LLEGO_NO,
  RELOADING,
} from '../actions/types';

const INITIAL_STATE = {
  last: '',
  ultima: 'no',
  reload: 'no',
  mostrarTodas: 'yes',
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ULTIMA_QUINIELA_UPDATE:
      return { ...state, last: action.payload };

    case ULTIMA_QUINIELA_LLEGO:
      return { ...state, ultima: 'yes' };

    case ULTIMA_QUINIELA_LLEGO_NO:
      return { ...state, ultima: 'no', mostrarTodas: 'no' };

    case RELOADING:
      return { ...state, reload: 'yes' };

    case RELOADED_QUINIELAS_ADMIN:
      return { ...state, reload: 'no' };

    default:
      return state;
  }
};
