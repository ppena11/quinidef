import { ULTIMA_QUINIELA_UPDATE } from '../actions/types';

const INITIAL_STATE = { last: '' };

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ULTIMA_QUINIELA_UPDATE:
      return { ...state, last: action.payload };

    default:
      return state;
  }
};
