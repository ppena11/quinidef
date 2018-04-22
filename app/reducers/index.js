import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import QuinielasReducer from './QuinielasReducer';
import QuinielasAdminReducer from './QuinielasAdminReducer';
import CreacionQuinielaReducer from './CreacionQuinielaReducer';
import TorneosReducer from './TorneosReducer';
import QuinielaUltimaReducer from './QuinielaUltimaReducer';
import JugadorUltimoReducer from './JugadorUltimoReducer';
import JugadoresAdminReducer from './JugadoresAdminReducer';
import CodigosReducer from './CodigosReducer';
// import nav from './nav';
import NavigationReducer from './NavigationReducer';
import ActivacionReducer from './ActivacionReducer';
import QAreducer from './QAreducer';
import PartidosReducer from './PartidosReducer';
import ApuestasReducer from './ApuestasReducer';
import QuiniReducer from './QuiniReducer';

export default combineReducers({
  auth: AuthReducer,
  nav: NavigationReducer,
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
});
