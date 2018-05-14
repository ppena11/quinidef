import {
  BUSCAR_CODIGOS_EXITO,
  BUSCAR_CODIGOS_NO_EXITO
} from "../actions/types";

const INITIAL_STATE = {
  quinielaID: "",
  recibirAbonados: true,
  codigoNoExiste: ""
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case BUSCAR_CODIGOS_EXITO:
      return { ...INITIAL_STATE, ...action.payload };

    case BUSCAR_CODIGOS_NO_EXITO:
      return { ...INITIAL_STATE, codigoNoExiste: "El código no es válido" };

    default:
      return state;
  }
};
