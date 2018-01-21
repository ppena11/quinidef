import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import QuinielasReducer from './QuinielasReducer';
import QuinielasAdminReducer from './QuinielasAdminReducer';
import TorneosReducer from './TorneosReducer';
import nav from './nav';

export default combineReducers({
  auth: AuthReducer,
  nav,
  quinielas: QuinielasReducer,
  quinielasadmin: QuinielasAdminReducer,
  torneos: TorneosReducer,
});
