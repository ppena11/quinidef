import { HORA_UPDATE, RESET_HORA } from "../actions/types";

const INITIAL_STATE = { hora: "" };

export default (state = INITIAL_STATE, action) => {
  /*   console.log(action.payload);
     // console.log(action.payload.key);
      //console.log(action.payload.value.key); */
  switch (action.type) {
    case HORA_UPDATE:
      //console.log("QURGJAGHJAGAJGAGAJHGAJ");
      //console.log(action.payload);
      //console.log("QURGJAGHJAGAJGAGAJHGAJ");
      return { ...INITIAL_STATE, hora: action.payload };

    case RESET_HORA:
      return {
        ...INITIAL_STATE
      };

    default:
      return state;
  }
};
