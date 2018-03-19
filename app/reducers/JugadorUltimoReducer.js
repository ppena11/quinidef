import {
  ULTIMA_JUGADOR_LLEGO_NO,
  MOSTRAR_TODAS_JUGADOR_ADMIN,
  ULTIMA_JUGADOR_UPDATE,
  ULTIMA_JUGADOR_LLEGO,
  OCULTAR_ULTIMA_JUGADOR_ADMIN,
  BUSCAR_JUGADOR_UPDATE,
  RELOADING_JUGADORES,
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
    case ULTIMA_JUGADOR_UPDATE:
      return { ...state, last: action.payload };

    case BUSCAR_JUGADOR_UPDATE:
      return { ...state, buscar: action.payload };

    case ULTIMA_JUGADOR_LLEGO:
      return { ...state, ultima: 'yes' };

    case ULTIMA_JUGADOR_LLEGO_NO:
      return { ...state, ultima: 'no' };

    case RELOADING_JUGADORES:
      return { ...INITIAL_STATE };

    // case RELOADED_QUINIELAS_ADMIN:
    // return { ...state, reload: 'no' };

    //  case MOSTRAR_MENU_QUINIELA_ADMIN:
    //  return { ...state, mostrarMenu: 'yes' };

    case MOSTRAR_TODAS_JUGADOR_ADMIN:
      return { ...state, mostrarTodas: 'yes' };

    case OCULTAR_ULTIMA_JUGADOR_ADMIN:
      return { ...state, mostrarTodas: 'no' };

    //  case ESCONDER_MENU_QUINIELA_ADMIN:
    //    return { ...state, mostrarMenu: 'no' };

    default:
      return state;
  }
};
