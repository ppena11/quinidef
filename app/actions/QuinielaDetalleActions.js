import firebase from 'firebase';
import _ from 'lodash';

import {
  ULTIMA_JUGADOR_LLEGO_NO,
  MOSTRAR_TODAS_JUGADOR_ADMIN,
  BUSCAR_JUGADORES_ADMINISTRADAS_EXITO,
  ULTIMA_JUGADOR_UPDATE,
  ULTIMA_JUGADOR_LLEGO,
  OCULTAR_ULTIMA_JUGADOR_ADMIN,
  BUSCAR_JUGADOR_UPDATE,
  RESET_JUGADORES_ADMIN,
  CAMBIAR_ESTATUS_JUGADOR,
  RELOADING_JUGADORES,
} from './types';

export const BuscarJugadorTexto = value => ({
  type: BUSCAR_JUGADOR_UPDATE,
  payload: value,
});

export const buscarJugadoresAdministradas = quiniela => (dispatch) => {
  firebase
    .database()
    .ref(`/quinielas/${quiniela}/clasificacion/`)
    .orderByKey()

    .limitToLast(15)
    .once('value', (snapshot) => {
      if (snapshot.exists()) {
        const tt = _.map(snapshot.val(), (val, uid) => ({ ...val, uid }));

        const dd = tt.reverse();
        const dd1 = dd.pop().uid;

        dispatch({
          type: ULTIMA_JUGADOR_LLEGO_NO,
        });
        dispatch({
          type: MOSTRAR_TODAS_JUGADOR_ADMIN,
        });
        dispatch({
          type: BUSCAR_JUGADORES_ADMINISTRADAS_EXITO,
          payload: snapshot.val(),
        });

        dispatch({
          type: ULTIMA_JUGADOR_UPDATE,
          payload: dd1,
        });
      }

      if (snapshot.exists()) {
        // console.log(`TAMANO DE LA DATA ${Object.keys(snapshot.val()).length}`);
        if (Object.keys(snapshot.val()).length < 15) {
          dispatch({ type: ULTIMA_JUGADOR_LLEGO });
          dispatch({ type: MOSTRAR_TODAS_JUGADOR_ADMIN });
        } else {
          dispatch({ type: OCULTAR_ULTIMA_JUGADOR_ADMIN });
        }
      }
    });
};

export const buscarJugadoresAdministradasMax = (max, quiniela) => (dispatch) => {
  firebase
    .database()
    .ref(`/quinielas/${quiniela}/clasificacion/`)
    .orderByKey()
    .endAt(max)
    .limitToLast(15)
    .once('value', (snapshot) => {
      if (snapshot.exists()) {
        const tt = _.map(snapshot.val(), (val, uid) => ({ ...val, uid }));

        const dd = tt.reverse();
        const dd1 = dd.pop().uid;

        // console.log(`APUNTADOR CON MAX ${dd1}`);
        dispatch({
          type: ULTIMA_JUGADOR_LLEGO_NO,
        });
        dispatch({
          type: ULTIMA_JUGADOR_UPDATE,
          payload: dd1,
        });
        dispatch({ type: BUSCAR_JUGADORES_ADMINISTRADAS_EXITO, payload: snapshot.val() });

        if (Object.keys(snapshot.val()).length < 15) {
          dispatch({ type: ULTIMA_JUGADOR_LLEGO });
          dispatch({ type: MOSTRAR_TODAS_JUGADOR_ADMIN });
        } else {
          dispatch({ type: OCULTAR_ULTIMA_JUGADOR_ADMIN });
        }
      }
    });
};

export const buscarJugadoresAdministradasT = (queryText, quiniela) => (dispatch) => {
  firebase
    .database()
    .ref(`/quinielas/${quiniela}/clasificacion/`)
    .limitToFirst(15)
    .orderByChild('nombre')
    .startAt(queryText)
    .endAt(`${queryText}\uf8ff`)

    .on('value', (snapshot) => {
      if (snapshot.exists()) {
        const tt = _.map(snapshot.val(), (val, uid) => ({ ...val, uid }));
        const dd = tt;
        const dd1 = dd.pop().nombre;
        // console.log(`APUNTADOR INICIAL CON BUSQUEDA TEXTO ${dd1}`);
        dispatch({
          type: ULTIMA_JUGADOR_LLEGO_NO,
        });

        dispatch({ type: RESET_JUGADORES_ADMIN });
        dispatch({ type: BUSCAR_JUGADORES_ADMINISTRADAS_EXITO, payload: snapshot.val() });
        dispatch({
          type: ULTIMA_JUGADOR_UPDATE,
          payload: dd1,
        });
        dispatch({ type: MOSTRAR_TODAS_JUGADOR_ADMIN });
      } else {
        dispatch({ type: RESET_JUGADORES_ADMIN });
      }

      if (snapshot.exists()) {
        // console.log(`TAMOANO DE QUINIELAS BUSQUEDA TEXTO INICIAL  ${Object.keys(snapshot.val()).length}`);
        if (Object.keys(snapshot.val()).length < 15) {
          dispatch({ type: ULTIMA_JUGADOR_LLEGO });
          dispatch({ type: MOSTRAR_TODAS_JUGADOR_ADMIN });
        } else {
          dispatch({ type: OCULTAR_ULTIMA_JUGADOR_ADMIN });
        }
      }
    });
};

export const buscarJugadoresAdministradasMaxT = (max, queryText, quiniela) => {
  const { currentUser } = firebase.auth();
  return (dispatch) => {
    firebase
      .database()
      .ref(`/quinielas/${quiniela}/clasificacion/`)
      .orderByChild('nombre')
      .startAt(max)
      .endAt(`${queryText}\uf8ff`)
      .limitToFirst(15)
      .once('value', (snapshot) => {
        if (snapshot.exists()) {
          const tt = _.map(snapshot.val(), (val, uid) => ({ ...val, uid }));
          const dd = tt.reverse();
          const dd1 = dd.pop().nombre;
          // console.log(`APUNTADOR sec CON BUSQUEDA TEXTO ${dd1}`);
          dispatch({
            type: ULTIMA_JUGADOR_LLEGO_NO,
          });
          dispatch({
            type: ULTIMA_JUGADOR_UPDATE,
            payload: dd1,
          });
          dispatch({ type: BUSCAR_JUGADORES_ADMINISTRADAS_EXITO, payload: snapshot.val() });
        }
        if (snapshot.exists()) {
          // console.log(`TAMOANO DE QUINIELAS BUSQUEDA TEXTO SIGUIENTE  ${Object.keys(snapshot.val()).length}`);
          if (Object.keys(snapshot.val()).length < 15) {
            dispatch({ type: ULTIMA_JUGADOR_LLEGO });
            dispatch({ type: MOSTRAR_TODAS_JUGADOR_ADMIN });
          } else {
            dispatch({ type: OCULTAR_ULTIMA_JUGADOR_ADMIN });
          }
        }
      });
  };
};

export const cambiarEstatusQuiniela = (apuesta, quiniela, status) => (dispatch) => {
  apuesta.activo = status;

  console.log(apuesta);
  const postData = {
    activo: apuesta.activo,
    nombre: apuesta.nombre,
    puntos: apuesta.puntos,
    jid: apuesta.jid,
  };

  // Write the new post's data simultaneously in the posts list and the user's post list.
  const updates = {};
  updates[`/quinielas/${quiniela}/clasificacion/${apuesta.uid}`] = postData;

  return firebase
    .database()
    .ref()
    .update(updates)
    .then((snap) => {
      crearQuinielaExito(dispatch, apuesta);
    })
    .catch(error => crearQuinielaError(dispatch, error));
};

const crearQuinielaExito = (dispatch, apuesta) => {
  dispatch({ type: CAMBIAR_ESTATUS_JUGADOR, payload: apuesta });
};

const crearQuinielaError = (dispatch, error) => {
  // dispatch({ type: CREATE_QUINIELA_FAIL, payload: error });
};

export const reloadingJugadores = () => ({
  type: RELOADING_JUGADORES,
});
