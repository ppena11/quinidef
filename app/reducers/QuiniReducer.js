import { QUINIELA_UPDATE_ID } from '../actions/types';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case QUINIELA_UPDATE_ID:
      return action.payload;

    default:
      return state;
  }
};
