import firebase from 'firebase';

import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  EXIT_SUCCESS,
  CREATE_USER_SUCCESS,
  CREATE_USER_FAIL,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER,
  GO_TO_MAIN,
  GO_TO_EMAIL_CONFIRMATION,
  EMAIL_ENVIADO,
  GO_TO_HOME,
  GO_TO_REINICIAR_CUENTA,
  GO_TO_CREAR_CUENTA,
} from './types';

export const emailChanged = text => ({
  type: EMAIL_CHANGED,
  payload: text,
});

export const passwordChanged = text => ({
  type: PASSWORD_CHANGED,
  payload: text,
});

export const salirSistema = () => (dispatch) => {
  dispatch({ type: LOGIN_USER });
  firebase
    .auth()
    .signOut()
    .then((user) => {
      salidaSuccess(dispatch, user);
    })
    .catch(error => loginUserFail(dispatch, error));
};

export const reiniciarCuenta = () => ({
  type: GO_TO_REINICIAR_CUENTA,
});

export const crearCuenta = () => ({
  type: GO_TO_CREAR_CUENTA,
});

export const loginUser = ({ email, password }) => (dispatch) => {
  dispatch({ type: LOGIN_USER });
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((user) => {
      loginUserSuccess(dispatch, user);
    })
    .catch(error => loginUserFail(dispatch, error));
};

export const createUser = ({ email, password }) => (dispatch) => {
  dispatch({ type: LOGIN_USER });
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((user) => {
      createUserSuccess(dispatch, user);
    })
    .catch(error => loginUserFail(dispatch, error));
};

export const recuperarEmail = email => (dispatch) => {
  dispatch({ type: LOGIN_USER });
  firebase
    .auth()
    .sendPasswordResetEmail(email)
    .then(() => {
      emailEnviado(dispatch);
    })
    .catch(error => loginUserFail(dispatch, error));
};

const loginUserFail = (dispatch, error) => {
  dispatch({ type: LOGIN_USER_FAIL, payload: error });
};

const createUserFail = (dispatch, error) => {
  dispatch({ type: CREATE_USER_FAIL, payload: error });
};

const loginUserSuccess = (dispatch, user) => {
  dispatch({ type: LOGIN_USER_SUCCESS, payload: user });
  dispatch({ type: GO_TO_MAIN });
};

const createUserSuccess = (dispatch, user) => {
  dispatch({ type: LOGIN_USER_SUCCESS, payload: user });
  dispatch({ type: GO_TO_MAIN });
};

const salidaSuccess = (dispatch) => {
  dispatch({ type: EXIT_SUCCESS });
  dispatch({ type: GO_TO_HOME });
};

export const gotohome = text => ({
  type: GO_TO_HOME,
  payload: text,
});
// dispatch({ type: GO_TO_EMAIL_CONFIRMATION });

const emailEnviado = (dispatch, user) => {
  dispatch({ type: EMAIL_ENVIADO });
  dispatch({ type: GO_TO_EMAIL_CONFIRMATION });
};
