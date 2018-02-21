import { QUINIELA_ADMINISTRADA_UPDATE } from '../actions/types';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case QUINIELA_ADMINISTRADA_UPDATE:
      return { ...state, [action.payload.prop]: action.payload.value };

    default:
      return state;
  }
};
