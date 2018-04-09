import { ACTIVACION_UPDATE } from '../actions/types';

const INITIAL_STATE = {
  disponibles: '',
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ACTIVACION_UPDATE:
      return { ...INITIAL_STATE, disponibles: action.payload };

    default:
      return state;
  }
};
