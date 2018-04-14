import { ACTIVACION_UPDATE_R } from '../actions/types';

const INITIAL_STATE = {
  disponibles: '',
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ACTIVACION_UPDATE_R:
      // console.log(`QUE PASASASASAS ${action.payload}`);
      return { ...INITIAL_STATE, disponibles: action.payload };

    default:
      return state;
  }
};
