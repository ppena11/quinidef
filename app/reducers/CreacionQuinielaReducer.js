import { NOMBRE_QUINIELA_CAMBIO, NOMBRE_TORNEO_CAMBIO } from '../actions/types';

const INITIAL_STATE = {
  nombreQuiniela: '',
  torneo: 'Rusia 2018',
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case NOMBRE_QUINIELA_CAMBIO:
      return { ...state, nombreQuiniela: action.payload };

    case NOMBRE_TORNEO_CAMBIO:
      return { ...state, torneo: action.payload };

    default:
      return state;
  }
};
