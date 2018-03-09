import firebase from 'firebase';
import _ from 'lodash';
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
  ULTIMA_QUINIELA_LLEGO,
  RESET_QUINIELAS_ADMIN,
  RELOADED_QUINIELAS_ADMIN,
  ULTIMA_QUINIELA_LLEGO_NO,
  RELOADING,
  BUSCAR_QUINIELAS_ADMINISTRADAS_EXITO_T,
  MOSTRAR_TODAS_QUINIELA_ADMIN,
  BUSCAR_QUINIELA_UPDATE,
  OCULTAR_ULTIMA_QUINIELA_ADMIN,
} from './types';

export const QuinielaUpdate = ({ prop, value }) => ({
  type: QUINIELA_UPDATE,
  payload: { prop, value },
});

export const BuscarQuinielaTexto = value => ({
  type: BUSCAR_QUINIELA_UPDATE,
  payload: value,
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

export const buscarQuinielasAdministradasT = (queryText) => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    firebase
      .database()
      .ref(`/users/${currentUser.uid}/quinielasadministradas/`)
      .limitToFirst(15)
      .orderByChild('quinielaNombrer')
      .startAt(queryText)
      .endAt(`${queryText}\uf8ff`)

      .on('value', (snapshot) => {
        if (snapshot.exists()) {
          const tt = _.map(snapshot.val(), (val, uid) => ({ ...val, uid }));
          const dd = tt;
          const dd1 = dd.pop().quinielaNombrer;
          // console.log(`APUNTADOR INICIAL CON BUSQUEDA TEXTO ${dd1}`);
          dispatch({
            type: ULTIMA_QUINIELA_LLEGO_NO,
          });

          dispatch({ type: RESET_QUINIELAS_ADMIN });
          dispatch({ type: BUSCAR_QUINIELAS_ADMINISTRADAS_EXITO, payload: snapshot.val() });
          dispatch({
            type: ULTIMA_QUINIELA_UPDATE,
            payload: dd1,
          });
          dispatch({ type: MOSTRAR_TODAS_QUINIELA_ADMIN });
        } else {
          dispatch({ type: RESET_QUINIELAS_ADMIN });
        }

        if (snapshot.exists()) {
          // console.log(`TAMOANO DE QUINIELAS BUSQUEDA TEXTO INICIAL  ${Object.keys(snapshot.val()).length}`);
          if (Object.keys(snapshot.val()).length < 15) {
            dispatch({ type: ULTIMA_QUINIELA_LLEGO });
            dispatch({ type: MOSTRAR_TODAS_QUINIELA_ADMIN });
          } else {
            dispatch({ type: OCULTAR_ULTIMA_QUINIELA_ADMIN });
          }
        }
      });
  };
};

export const buscarQuinielasAdministradasMaxT = (max, queryText) => {
  const { currentUser } = firebase.auth();
  return (dispatch) => {
    firebase
      .database()
      .ref(`/users/${currentUser.uid}/quinielasadministradas/`)
      .orderByChild('quinielaNombrer')
      .startAt(max)
      .endAt(`${queryText}\uf8ff`)
      .limitToFirst(15)
      .on('value', (snapshot) => {
        if (snapshot.exists()) {
          const tt = _.map(snapshot.val(), (val, uid) => ({ ...val, uid }));
          const dd = tt.reverse();
          const dd1 = dd.pop().quinielaNombrer;
          // console.log(`APUNTADOR sec CON BUSQUEDA TEXTO ${dd1}`);
          dispatch({
            type: ULTIMA_QUINIELA_LLEGO_NO,
          });
          dispatch({
            type: ULTIMA_QUINIELA_UPDATE,
            payload: dd1,
          });
          dispatch({ type: BUSCAR_QUINIELAS_ADMINISTRADAS_EXITO, payload: snapshot.val() });
        }
        if (snapshot.exists()) {
          // console.log(`TAMOANO DE QUINIELAS BUSQUEDA TEXTO SIGUIENTE  ${Object.keys(snapshot.val()).length}`);
          if (Object.keys(snapshot.val()).length < 15) {
            dispatch({ type: ULTIMA_QUINIELA_LLEGO });
            dispatch({ type: MOSTRAR_TODAS_QUINIELA_ADMIN });
          } else {
            dispatch({ type: OCULTAR_ULTIMA_QUINIELA_ADMIN });
          }
        }
      });
  };
};

export const buscarQuinielasAdministradas = () => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    firebase
      .database()
      .ref(`/users/${currentUser.uid}/quinielasadministradas/`)
      .orderByKey()

      .limitToLast(15)
      .on('value', (snapshot) => {
        if (snapshot.exists()) {
          const tt = _.map(snapshot.val(), (val, uid) => ({ ...val, uid }));

          const dd = tt.reverse();
          const dd1 = dd.pop().uid;
          // console.log(`APUNTADOR INICIAL  ${dd1}`);

          dispatch({
            type: ULTIMA_QUINIELA_LLEGO_NO,
          });
          dispatch({ type: BUSCAR_QUINIELAS_ADMINISTRADAS_EXITO, payload: snapshot.val() });
          dispatch({
            type: ULTIMA_QUINIELA_UPDATE,
            payload: dd1,
          });
        }

        if (snapshot.exists()) {
          if (Object.keys(snapshot.val()).length < 15) {
            dispatch({ type: ULTIMA_QUINIELA_LLEGO });
            dispatch({ type: MOSTRAR_TODAS_QUINIELA_ADMIN });
          } else {
            dispatch({ type: OCULTAR_ULTIMA_QUINIELA_ADMIN });
          }
        }
      });
  };
};

export const buscarQuinielasAdministradasMax = (max) => {
  const { currentUser } = firebase.auth();
  return (dispatch) => {
    firebase
      .database()
      .ref(`/users/${currentUser.uid}/quinielasadministradas/`)
      .orderByKey()
      .endAt(max)
      .limitToLast(15)
      .on('value', (snapshot) => {
        if (snapshot.exists()) {
          const tt = _.map(snapshot.val(), (val, uid) => ({ ...val, uid }));

          const dd = tt.reverse();
          const dd1 = dd.pop().uid;

          // console.log(`APUNTADOR CON MAX ${dd1}`);
          dispatch({
            type: ULTIMA_QUINIELA_LLEGO_NO,
          });
          dispatch({
            type: ULTIMA_QUINIELA_UPDATE,
            payload: dd1,
          });
          dispatch({ type: BUSCAR_QUINIELAS_ADMINISTRADAS_EXITO, payload: snapshot.val() });

          if (Object.keys(snapshot.val()).length < 15) {
            dispatch({ type: ULTIMA_QUINIELA_LLEGO });
          }
        }
      });
  };
};

export const ultimaQuinielasAdministrada = last => ({
  type: ULTIMA_QUINIELA_UPDATE,
  payload: last,
});

export const ultimaQuinielasLlego = () => ({
  type: ULTIMA_QUINIELA_LLEGO,
});

export const reloadingQuinielas = () => ({
  type: RELOADING,
});

export const ultimaQuinielasLlegoNo = () => ({
  type: ULTIMA_QUINIELA_LLEGO_NO,
});

export const resetQuinielasAdmin = () => ({
  type: RESET_QUINIELAS_ADMIN,
});

export const reloadedQuinielasAdmin = () => ({
  type: RELOADED_QUINIELAS_ADMIN,
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
  const quinielaNombrer = quinielaNombre + newPostKey;
  const postData = {
    quinielaNombre,
    torneo,
    admin: currentUser.uid,
    adminr,
    quinielaNombrer,
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
  // dispatch({ type: GO_TO_ADMINISTRADAS });
};

const crearQuinielaError = (dispatch, error) => {
  dispatch({ type: CREATE_QUINIELA_FAIL, payload: error });
};
