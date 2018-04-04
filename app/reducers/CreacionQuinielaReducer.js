import {
  NOMBRE_QUINIELA_CAMBIO,
  NOMBRE_TORNEO_CAMBIO,
  CREATE_QUINIELA_FAIL,
  ID_TORNEO_CAMBIO,
  ACTUALIZAR_CODIGO_QUINIELA,
  RELOADING,
  BUSCAR_REGLAS_EXITO,
} from '../actions/types';

const INITIAL_STATE = {
  nombreQuiniela: '',
  torneo: 'Rusia 2018',
  error: '',
  torneoid: '',
  codigo: '',
  reglas: {},
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case NOMBRE_QUINIELA_CAMBIO:
      return { ...state, nombreQuiniela: action.payload };

    case RELOADING:
      return { ...state, nombreQuiniela: '' };

    case NOMBRE_TORNEO_CAMBIO:
      return { ...state, torneo: action.payload };

    case ID_TORNEO_CAMBIO:
      return { ...state, torneoid: action.payload };

    case ACTUALIZAR_CODIGO_QUINIELA:
      return { ...state, codigo: action.payload };

    case BUSCAR_REGLAS_EXITO:
      return { ...state, reglas: action.payload };

    case CREATE_QUINIELA_FAIL:
      return { ...state, error: 'Revisa tu conexion a Internet' };

    default:
      return state;
  }
};
