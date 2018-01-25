import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import QuinielasReducer from './QuinielasReducer';
import NavigationReducer from './NavigationReducer';

export default combineReducers({
  auth: AuthReducer,
  nav: NavigationReducer,
  quinielas: QuinielasReducer,
});
