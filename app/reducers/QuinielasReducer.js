import { QUINIELA_UPDATE } from '../actions/types';

const INITIAL_STATE = {
  quinielas: [
    2,
    1,
    34,
    545,
    656,
    2,
    1,
    34,
    545,
    656,
    2,
    1,
    34,
    545,
    656,
    2,
    1,
    34,
    545,
    656,
    2,
    1,
    34,
    545,
    656,
    2,
    1,
    34,
    545,
    656,
  ],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case QUINIELA_UPDATE:
      return { ...state, [action.payload.prop]: action.payload.value };

    default:
      return state;
  }
};
