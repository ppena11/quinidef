import {
  ULTIMA_QUINIELA_UPDATE,
  ULTIMA_QUINIELA_LLEGO,
  RESET_QUINIELAS_ADMIN,
  RELOADED_QUINIELAS_ADMIN,
  ULTIMA_QUINIELA_LLEGO_NO,
  RELOADING,
  ESCONDER_MENU_QUINIELA_ADMIN,
  MOSTRAR_MENU_QUINIELA_ADMIN,
  MOSTRAR_TODAS_QUINIELA_ADMIN,
  BUSCAR_QUINIELA_UPDATE,
  OCULTAR_ULTIMA_QUINIELA_ADMIN,
} from '../actions/types';

const INITIAL_STATE = {
  last: '',
  ultima: 'no',
  reload: 'no',
  mostrarTodas: 'yes',
  mostrarMenu: 'yes',
  buscar: '',
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ULTIMA_QUINIELA_UPDATE:
      return { ...state, last: action.payload };

    case BUSCAR_QUINIELA_UPDATE:
      return { ...state, buscar: action.payload };

    case ULTIMA_QUINIELA_LLEGO:
      return { ...state, ultima: 'yes' };

    case ULTIMA_QUINIELA_LLEGO_NO:
      return { ...state, ultima: 'no' };

    case RELOADING:
      return { ...state, reload: 'yes', buscar: '' };

    case RELOADED_QUINIELAS_ADMIN:
      return { ...state, reload: 'no' };

    case MOSTRAR_MENU_QUINIELA_ADMIN:
      return { ...state, mostrarMenu: 'yes' };

    case MOSTRAR_TODAS_QUINIELA_ADMIN:
      return { ...state, mostrarTodas: 'yes' };

    case OCULTAR_ULTIMA_QUINIELA_ADMIN:
      return { ...state, mostrarTodas: 'no' };

    case ESCONDER_MENU_QUINIELA_ADMIN:
      return { ...state, mostrarMenu: 'no' };

    default:
      return state;
  }
};
