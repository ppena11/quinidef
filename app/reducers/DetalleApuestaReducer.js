import {
  RESET_DETALLE_AP,
  RESET_CARGANDO_DETALLE_AP,
  BUSCAR_DETALLE_APUESTAS_EXITO
} from "../actions/types";

const INITIAL_STATE = { cargando: true };

export default (state = INITIAL_STATE, action) => {
  /*   console.log(action.payload);
    //console.log(action.payload.key);
    //console.log(action.payload.value.key); */
  switch (action.type) {
    case BUSCAR_DETALLE_APUESTAS_EXITO:
      return { ...action.payload, cargando: false };

    case RESET_DETALLE_AP:
      return {
        ...INITIAL_STATE
      };

    case RESET_CARGANDO_DETALLE_AP:
      return { ...state, cargando: true };

    default:
      return state;
  }
};
