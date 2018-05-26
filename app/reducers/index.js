import { combineReducers } from "redux";
import AuthReducer from "./AuthReducer";
import QuinielasReducer from "./QuinielasReducer";
import QuinielasAdminReducer from "./QuinielasAdminReducer";
import CreacionQuinielaReducer from "./CreacionQuinielaReducer";
import TorneosReducer from "./TorneosReducer";
import QuinielaUltimaReducer from "./QuinielaUltimaReducer";
import JugadorUltimoReducer from "./JugadorUltimoReducer";
import JugadoresAdminReducer from "./JugadoresAdminReducer";
import CodigosReducer from "./CodigosReducer";
// import nav from './nav';
import NavigationReducer from "./NavigationReducer";
import NavigationReducer1 from "./NavigationReducer1";
import ActivacionReducer from "./ActivacionReducer";
import QAreducer from "./QAreducer";
import PartidosReducer from "./PartidosReducer";
import ApuestasReducer from "./ApuestasReducer";
import QuiniReducer from "./QuiniReducer";
import PosicionesReducer from "./PosicionesReducer";
import DetalleApuestaReducer from "./DetalleApuestaReducer";
import HoraReducer from "./HoraReducer";
import TimeReducer from "./TimeReducer";
import AdminReducers from "./AdminReducers";

export default combineReducers({
  auth: AuthReducer,
  nav: NavigationReducer,
  nav1: NavigationReducer1,
  quinielas: QuinielasReducer,
  quinielasadmin: QuinielasAdminReducer,
  torneos: TorneosReducer,
  creacionquinielas: CreacionQuinielaReducer,
  quinielalast: QuinielaUltimaReducer,
  jugadorlast: JugadorUltimoReducer,
  jugadoresadmin: JugadoresAdminReducer,
  codigos: CodigosReducer,
  activacion: ActivacionReducer,
  disponible: QAreducer,
  partidos: PartidosReducer,
  apuestas: ApuestasReducer,
  quini: QuiniReducer,
  posiciones: PosicionesReducer,
  detalleapuesta: DetalleApuestaReducer,
  hora: HoraReducer,
  time: TimeReducer,
  admin: AdminReducers
});
