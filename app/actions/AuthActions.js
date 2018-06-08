import firebase from "firebase"

import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  EXIT_SUCCESS,
  CREATE_USER_SUCCESS,
  CREATE_USER_FAIL,
  CREATE_USER_FAILED,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER,
  LOGIN_LIMPIAR_FORMULARIO,
  GO_TO_MAIN,
  GO_TO_EMAIL_CONFIRMATION,
  EMAIL_ENVIADO,
  GO_TO_HOME,
  GO_TO_LOGOUT,
  LOGIN_USER1,
  LOGGED_USER1,
  NOMBRE_CHANGED,
  GO_TO_SALIR,
  GO_TO_ADMINISTRADAS,
  GO_TO_TUSQUINIELAS
} from "./types"

export const emailChanged = text => ({
  type: EMAIL_CHANGED,
  payload: text
})

export const nombreChanged = text => ({
  type: NOMBRE_CHANGED,
  payload: text
})

export const createUserFaileded = () => ({
  type: CREATE_USER_FAILED,
  payload: "auth/invalid-name"
})

export const passwordChanged = text => ({
  type: PASSWORD_CHANGED,
  payload: text
})

export const usuarioRegistrado = () => dispatch => {
  dispatch({ type: GO_TO_MAIN })
}

export const loginUser1 = text => ({
  type: LOGIN_USER1,
  payload: text
})

export const logeddUser1 = text => ({
  type: LOGGED_USER1,
  payload: text
})

export const salir = () => ({
  type: GO_TO_SALIR
})

export const irAdministradas = () => ({
  type: GO_TO_ADMINISTRADAS
})

export const irTusQuinielas = () => ({
  type: GO_TO_TUSQUINIELAS
})

export const salirSistema = () => dispatch => {
  dispatch({ type: LOGIN_USER })
  firebase
    .auth()
    .signOut()
    .then(user => {
      salidaSuccess(dispatch)
    })
    .catch(error => loginUserFail(dispatch, error))
}

export const limpiarFormularioLogin = () => ({
  type: LOGIN_LIMPIAR_FORMULARIO
})

export const loginUser = ({ email, password }) => dispatch => {
  dispatch({ type: LOGIN_USER })
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(user => {
      loginUserSuccess(dispatch, user)
    })
    .catch(error => loginUserFail(dispatch, error))
}

export const createUser = ({ email, password, nombre }) => dispatch => {
  dispatch({ type: LOGIN_USER })
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(user => {
      createUserSuccess(dispatch, user, nombre)
    })
    .catch(error => loginUserFail(dispatch, error))
}

export const recuperarEmail = email => dispatch => {
  dispatch({ type: LOGIN_USER })
  firebase
    .auth()
    .sendPasswordResetEmail(email)
    .then(() => {
      alert("Revisa tu correo")
      emailEnviado(dispatch)
    })
    .catch(error => loginUserFail(dispatch, error))
}

const loginUserFail = (dispatch, error) => {
  dispatch({ type: LOGIN_USER_FAIL, payload: error })
}

const createUserFail = (dispatch, error) => {
  dispatch({ type: CREATE_USER_FAIL, payload: error })
}

const loginUserSuccess = (dispatch, user) => {
  dispatch({ type: LOGIN_USER_SUCCESS, payload: user })
  // dispatch({ type: GO_TO_MAIN });
}

const createUserSuccess = (dispatch, user, nombre) => {
  const { currentUser } = firebase.auth()
  const postData1 = { nombre, user: currentUser.uid, email: currentUser.email }
  // console.log(`NOMBRE ${nombre}`);
  // console.log(`UID ${currentUser.uid}`);
  const updates1 = {}

  updates1[`/users/${currentUser.uid}/info`] = postData1
  firebase
    .database()
    .ref()
    .update(updates1)
    .then(snap => {
      dispatch({ type: LOGIN_USER_SUCCESS })
      //  dispatch({ type: GO_TO_MAIN });
    })
    .catch(error => loginUserFail(dispatch, error))
}

const salidaSuccess = dispatch => {
  dispatch({ type: EXIT_SUCCESS })
  dispatch({ type: GO_TO_LOGOUT })
}

export const gotohome = text => ({
  type: GO_TO_HOME,
  payload: text
})
// dispatch({ type: GO_TO_EMAIL_CONFIRMATION });

const emailEnviado = (dispatch, user) => {
  dispatch({ type: EMAIL_ENVIADO })
  dispatch({ type: GO_TO_EMAIL_CONFIRMATION })
}
