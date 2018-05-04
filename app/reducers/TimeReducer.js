import { TIME_UPDATE } from "../actions/types";

const INITIAL_STATE = {
  time: ""
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TIME_UPDATE:
      // console.log(`QUE PASASASASAS ${action.payload}`);
      return { ...INITIAL_STATE, time: action.payload };

    default:
      return state;
  }
};
