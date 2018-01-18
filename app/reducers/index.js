import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import QuinielasReducer from './QuinielasReducer';
import nav from './nav';

export default combineReducers({
  auth: AuthReducer,
  nav,
  quinielas: QuinielasReducer,
});
