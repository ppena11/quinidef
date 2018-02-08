import {
  NOMBRE_QUINIELA_CAMBIO,
  NOMBRE_TORNEO_CAMBIO,
  CREATE_QUINIELA_FAIL,
} from '../actions/types';

const INITIAL_STATE = {
  nombreQuiniela: '',
  torneo: 'Rusia 2018',
  error: '',
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case NOMBRE_QUINIELA_CAMBIO:
      return { ...state, nombreQuiniela: action.payload };

    case NOMBRE_TORNEO_CAMBIO:
      return { ...state, torneo: action.payload };

    case CREATE_QUINIELA_FAIL:
      return { ...state, error: 'Revisa tu conexion a Internet' };

    default:
      return state;
  }
};
