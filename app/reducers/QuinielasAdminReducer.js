import _ from "lodash";
import {
  QUINIELA_UPDATE,
  BUSCAR_QUINIELAS_ADMINISTRADAS_EXITO,
  RESET_QUINIELAS_ADMIN,
  BUSCAR_QUINIELAS_ADMINISTRADAS_EXITO_T,
  CAMBIAR_ID_TORNEO,
  UPDATE_DISPO,
  EXIT_SUCCESS
} from "../actions/types";

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case QUINIELA_UPDATE:
      return { ...state, [action.payload.prop]: action.payload.value };

    case BUSCAR_QUINIELAS_ADMINISTRADAS_EXITO:
      return { ...action.payload };

    case BUSCAR_QUINIELAS_ADMINISTRADAS_EXITO_T:
      return { ...state, ...action.payload };

    case RESET_QUINIELAS_ADMIN:
      return { ...INITIAL_STATE };

    case CAMBIAR_ID_TORNEO:
      return {
        ...state,
        [action.payload.uid]: _.omit(action.payload, "uid")
      };

    case UPDATE_DISPO:
      return {
        ...state,
        [action.payload.uid]: _.omit(action.payload, "uid")
      };

    case EXIT_SUCCESS:
      return {
        ...INITIAL_STATE
      };

    default:
      return state;
  }
};
