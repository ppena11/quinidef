import firebase from 'firebase';
import {
  QUINIELA_UPDATE,
  BUSCAR_QUINIELAS_EXITO,
  BUSCAR_QUINIELAS_ADMINISTRADAS_EXITO,
  NOMBRE_QUINIELA_CAMBIO,
  NOMBRE_TORNEO_CAMBIO,
  GO_TO_MAIN,
  CREATE_QUINIELA_FAIL,
  GO_TO_ADMINISTRADAS,
  ULTIMA_QUINIELA_UPDATE,
} from './types';

export const QuinielaUpdate = ({ prop, value }) => ({
  type: QUINIELA_UPDATE,
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
      .ref(`/users/${currentUser.uid}/quinielasadministradas/`)
      .orderByChild('adminr')

      .limitToFirst(15)
      .once('value', (snapshot) => {
        dispatch({ type: BUSCAR_QUINIELAS_ADMINISTRADAS_EXITO, payload: snapshot.val() });
      });
  };
};

export const buscarQuinielasAdministradasMax = (max) => {
  const { currentUser } = firebase.auth();
  console.log(`max ${max}`);
  return (dispatch) => {
    firebase
      .database()
      .ref(`/users/${currentUser.uid}/quinielasadministradas/`)
      .orderByChild('adminr')
      .startAt(max)
      .limitToFirst(15)
      .once('value', (snapshot) => {
        dispatch({ type: BUSCAR_QUINIELAS_ADMINISTRADAS_EXITO, payload: snapshot.val() });
      });
  };
};

export const ultimaQuinielasAdministrada = last => ({
  type: ULTIMA_QUINIELA_UPDATE,
  payload: last,
});

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

  // Get a key for a new Post.
  const newPostKey = firebase
    .database()
    .ref()
    .child('posts')
    .push().key;

  const adminr = currentUser.uid + newPostKey;
  const postData = {
    quinielaNombre,
    torneo,
    admin: currentUser.uid,
    adminr,
  };

  // Write the new post's data simultaneously in the posts list and the user's post list.
  const updates = {};
  updates[`/users/${currentUser.uid}/quinielasadministradas/${newPostKey}`] = postData;
  updates[`/quinielas/${newPostKey}`] = postData;

  return firebase
    .database()
    .ref()
    .update(updates)
    .then((snap) => {
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
