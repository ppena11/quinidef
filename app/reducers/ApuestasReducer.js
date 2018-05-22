import {
  RESET_DETALLE_QUINIELA_AP,
  BUSCAR_APUESTAS_EXITO,
  MODIFICAR_APUESTAS,
  RESET_CARGANDO_AP
} from "../actions/types";

const INITIAL_STATE = { cargando: true };

export default (state = INITIAL_STATE, action) => {
  /*   console.log(action.payload);
  //console.log(action.payload.key);
  //console.log(action.payload.value.key); */
  switch (action.type) {
    case BUSCAR_APUESTAS_EXITO:
      return { ...action.payload, cargando: false };

    case MODIFICAR_APUESTAS:
      return { ...state, [action.payload.key]: action.payload.value };

    case RESET_DETALLE_QUINIELA_AP:
      return {
        ...INITIAL_STATE
      };

    case RESET_CARGANDO_AP:
      return { ...state, cargando: true };

    default:
      return state;
  }
};
