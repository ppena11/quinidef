import { NOMBRE_QUINIELA_CAMBIO } from '../actions/types';

const INITIAL_STATE = {
  nombreQuiniela: '',
  torneo: '',
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case NOMBRE_QUINIELA_CAMBIO:
      return { ...state, nombreQuiniela: action.payload };

    default:
      return state;
  }
};
