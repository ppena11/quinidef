import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import QuinielasReducer from './QuinielasReducer';
import QuinielasAdminReducer from './QuinielasAdminReducer';
import CreacionQuinielaReducer from './CreacionQuinielaReducer';
import TorneosReducer from './TorneosReducer';
import QuinielaUltimaReducer from './QuinielaUltimaReducer';
// import nav from './nav';
import NavigationReducer from './NavigationReducer';

export default combineReducers({
  auth: AuthReducer,
  nav: NavigationReducer,
  quinielas: QuinielasReducer,
  quinielasadmin: QuinielasAdminReducer,
  torneos: TorneosReducer,
  creacionquinielas: CreacionQuinielaReducer,
  quinielalast: QuinielaUltimaReducer,
});
