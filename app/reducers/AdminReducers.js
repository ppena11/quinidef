import { BUSCAR_ADMIN_EXITO, RESET_ADMIN } from "../actions/types";

const INITIAL_STATE = { cargando: true };

export default (state = INITIAL_STATE, action) => {
  /*   console.log(action.payload);
    //console.log(action.payload.key);
    //console.log(action.payload.value.key); */
  switch (action.type) {
    case BUSCAR_ADMIN_EXITO:
      return { ...action.payload, cargando: false };

    case RESET_ADMIN:
      return {
        ...INITIAL_STATE
      };

    default:
      return state;
  }
};
