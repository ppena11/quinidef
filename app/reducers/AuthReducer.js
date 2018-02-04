import { manejarError } from '../comun/helper';

import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  CREATE_USER_FAIL,
  EMAIL_ENVIADO,
  GO_TO_HOME,
  EXIT_SUCCESS,
  LOGIN_LIMPIAR_FORMULARIO,
  LOGIN_USER1,
  LOGGED_USER1,
} from '../actions/types';

const INITIAL_STATE = {
  email: '',
  password: '',
  user: '',
  error: '',
  placeholder: 'Ingresa tu correo electrónico...',
  placeholderc: 'Contraseña...',
  authenticating: false,
  init: true,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case EMAIL_CHANGED:
      return { ...state, email: action.payload };

    case PASSWORD_CHANGED:
      return { ...state, password: action.payload };

    case LOGIN_USER1:
      return { ...state, init: true };

    case LOGGED_USER1:
      return { ...state, init: false };

    case EXIT_SUCCESS:
      return {
        ...state,
        ...INITIAL_STATE,
      };

    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        ...INITIAL_STATE,
        user: action.payload,
      };

    case LOGIN_USER:
      return { ...state, authenticating: true, error: '' };

    case EMAIL_ENVIADO:
      return {
        ...state,
        authenticating: false,
        password: '',
        placeholderc: 'Contraseña...',
        error: '',
      };

    case GO_TO_HOME:
      return {
        ...state,
        authenticating: false,
        password: '',
        placeholderc: 'Contraseña...',
        error: '',
      };

    case LOGIN_LIMPIAR_FORMULARIO:
      return {
        ...state,
        authenticating: false,
        password: '',
        placeholderc: 'Contraseña...',
        error: '',
      };

    case LOGIN_USER_FAIL:
      return { ...state, ...manejarError(action.payload.code) };

    case CREATE_USER_FAIL:
      return { ...state, ...manejarError(action.payload.code) };

    default:
      return state;
  }
};
