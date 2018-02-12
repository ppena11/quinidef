import firebase from 'firebase';
import { QUINIELA_ADMINISTRADA_UPDATE } from './types';

export const QuinielaAdministradaUpdate = ({ prop, value }) => ({
  type: QUINIELA_ADMINISTRADA_UPDATE,
  payload: { prop, value },
});

export const buscarQuinielas = () => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    firebase
      .database()
      .ref(`/users/${currentUser.uid}/quinielas`)
      .on('value', (snapshot) => {
        dispatch({ type: BUSCAR_QUINIELAS_EXITO, payload: snapshot.val() });
      });
  };
};

export const buscarQuinielasAdministradas = () => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    firebase
      .database()
      .ref(`/users/${currentUser.uid}/quinielasadministradas`)
      .on('value', (snapshot) => {
        dispatch({ type: BUSCAR_QUINIELAS_ADMINISTRADAS_EXITO, payload: snapshot.val() });
      });
  };
};

export const nombreQuinielaCambio = text => ({
  type: NOMBRE_QUINIELA_CAMBIO,
  payload: text,
});

export const nombreTorneoCambio = text => ({
  type: NOMBRE_TORNEO_CAMBIO,
  payload: text,
});

export const crearQuiniela = ({ quinielaNombre, torneo }) => (dispatch) => {
  const { currentUser } = firebase.auth();
  firebase
    .database()
    .ref(`/users/${currentUser.uid}/quinielasadministradas`)
    .push({ quinielaNombre, torneo })
    .then(() => {
      crearQuinielaExito(dispatch);
    })
    .catch(error => crearQuinielaError(dispatch, error));
};

const crearQuinielaExito = (dispatch) => {
  dispatch({ type: GO_TO_ADMINISTRADAS });
};

const crearQuinielaError = (dispatch, error) => {
  dispatch({ type: CREATE_QUINIELA_FAIL, payload: error });
};
