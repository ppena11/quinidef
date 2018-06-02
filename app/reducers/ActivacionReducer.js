import {
  ACTIVACION_UPDATE,
  ACTIVACION_UPDATE_POR_ACTIVAR,
  ACTIVACION_UPDATE_ACTIVOS
} from "../actions/types"

const INITIAL_STATE = {}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ACTIVACION_UPDATE:
      return { ...INITIAL_STATE, ...action.payload }

    case ACTIVACION_UPDATE_POR_ACTIVAR:
      return { ...state, poractivar: action.payload }

    case ACTIVACION_UPDATE_ACTIVOS:
      return { ...state, activos: action.payload }

    default:
      return state
  }
}
