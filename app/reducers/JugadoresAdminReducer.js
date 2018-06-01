import _ from "lodash"
import {
  QUINIELA_UPDATE,
  BUSCAR_JUGADORES_ADMINISTRADAS_EXITO,
  RESET_JUGADORES_ADMIN,
  BUSCAR_QUINIELAS_ADMINISTRADAS_EXITO_T,
  CAMBIAR_ESTATUS_JUGADOR,
  RELOADING_JUGADORES,
  ELIMINAR_JUGADOR
} from "../actions/types"

const INITIAL_STATE = {}

export default (state = INITIAL_STATE, action) => {
  const t = state
  switch (action.type) {
    case QUINIELA_UPDATE:
      return { ...state, [action.payload.prop]: action.payload.value }

    case BUSCAR_JUGADORES_ADMINISTRADAS_EXITO:
      return { ...INITIAL_STATE, ...action.payload }

    case BUSCAR_QUINIELAS_ADMINISTRADAS_EXITO_T:
      return { ...state, ...action.payload }

    case RELOADING_JUGADORES:
      return { ...INITIAL_STATE }

    case CAMBIAR_ESTATUS_JUGADOR:
      return {
        ...state,
        [action.payload.uid]: _.omit(action.payload, "uid")
      }

    case ELIMINAR_JUGADOR:
      return { ...state, ...action.payload }

    default:
      return state
  }
}
