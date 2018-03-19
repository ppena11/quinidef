import {
  NOMBRE_QUINIELA_CAMBIO,
  NOMBRE_TORNEO_CAMBIO,
  CREATE_QUINIELA_FAIL,
  ID_TORNEO_CAMBIO,
} from '../actions/types';

const INITIAL_STATE = {
  nombreQuiniela: '',
  torneo: 'Rusia 2018',
  error: '',
  torneoid: '',
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case NOMBRE_QUINIELA_CAMBIO:
      return { ...state, nombreQuiniela: action.payload };

    case NOMBRE_TORNEO_CAMBIO:
      return { ...state, torneo: action.payload };

    case ID_TORNEO_CAMBIO:
      return { ...state, torneoid: action.payload };

    case CREATE_QUINIELA_FAIL:
      return { ...state, error: 'Revisa tu conexion a Internet' };

    default:
      return state;
  }
};
