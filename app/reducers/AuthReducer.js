import {
  manejarError,
  defaultplaceholder,
  defaultplaceholderc,
  defaultplaceholdern,
} from '../comun/helper';

import {
  EMAIL_CHANGED,
  NOMBRE_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  CREATE_USER_FAIL,
  CREATE_USER_FAILED,
  EMAIL_ENVIADO,
  GO_TO_HOME,
  EXIT_SUCCESS,
  LOGIN_LIMPIAR_FORMULARIO,
  LOGIN_USER1,
  LOGGED_USER1,
} from '../actions/types';

const INITIAL_STATE = {
  email: '',
  nombre: '',
  password: '',
  user: '',
  error: '',
  placeholder: defaultplaceholder,
  placeholdern: defaultplaceholdern,
  placeholderc: defaultplaceholderc,
  authenticating: false,
  init: true,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case EMAIL_CHANGED:
      return { ...state, email: action.payload };

    case NOMBRE_CHANGED:
      return { ...state, nombre: action.payload };

    case PASSWORD_CHANGED:
      return { ...state, password: action.payload };

    case LOGIN_USER1:
      return { ...state, user: action.payload };

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
      };

    case LOGIN_USER:
      return { ...state, authenticating: true, error: '' };

    case EMAIL_ENVIADO:
      return {
        ...state,
        authenticating: false,
        password: '',
        placeholderc: defaultplaceholderc,
        error: '',
      };

    case GO_TO_HOME:
      return {
        ...state,
        authenticating: false,
        password: '',
        placeholderc: defaultplaceholderc,
        error: '',
      };

    case LOGIN_LIMPIAR_FORMULARIO:
      return {
        ...state,
        authenticating: false,
        password: '',
        placeholderc: defaultplaceholderc,
        error: '',
      };

    case LOGIN_USER_FAIL:
      return { ...state, ...manejarError(action.payload.code) };

    case CREATE_USER_FAIL:
      return { ...state, ...manejarError(action.payload.code) };

    case CREATE_USER_FAILED:
      return { ...state, ...manejarError(action.payload) };

    default:
      return state;
  }
};
