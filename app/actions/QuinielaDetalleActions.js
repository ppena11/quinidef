import firebase from "firebase";
import _ from "lodash";

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
  ACTUALIZAR_CODIGO_QUINIELA,
  ACTIVACION_UPDATE,
  ACTIVACION_UPDATE_R,
  UPDATE_DISPO,
  ACTIVACION_UPDATE_POR_ACTIVAR,
  ACTIVACION_UPDATE_ACTIVOS,
  BUSCAR_PARTIDOS_EXITO,
  BUSCAR_APUESTAS_EXITO,
  BUSCAR_DETALLE_APUESTAS_EXITO,
  HORA_UPDATE
} from "./types";

export const BuscarJugadorTexto = value => ({
  type: BUSCAR_JUGADOR_UPDATE,
  payload: value
});

export const buscarDisponibles = quiniela => dispatch => {
  firebase
    .database()
    .ref(`/quinielas/${quiniela}/info/`)
    .on("value", snapshot => {
      if (snapshot.exists()) {
        dispatch({
          type: ACTIVACION_UPDATE,
          payload: snapshot.val()
        });
      }
    });
};

export const buscarPartidos = torneo => dispatch =>
  firebase
    .database()
    .ref(`/torneos/${torneo}/partidos`)
    // .ref(`master/torneos/idTorneo2/partidos`)
    .once("value", snapshot => {
      dispatch({ type: BUSCAR_PARTIDOS_EXITO, payload: snapshot.val() });
    });

export const buscarApuestas = (quinielaid, nombreapuesta) => dispatch =>
  firebase
    .database()
    .ref(`/quinielas/${quinielaid}/clasificacion/${nombreapuesta}/partidos`)
    // .ref(`master/torneos/idTorneo2/partidos`)
    .once("value", snapshot => {
      dispatch({ type: BUSCAR_APUESTAS_EXITO, payload: snapshot.val() });
    });

export const buscarHora = () => dispatch =>
  firebase
    .database()
    .ref("currentTime/")
    .once("value", snapshot => {
      dispatch({ type: HORA_UPDATE, payload: snapshot.val().time });
    });

export const escribirHora = () => dispatch =>
  firebase
    .database()
    .ref("currentTime/")
    .update({ time: firebase.database.ServerValue.TIMESTAMP }, snapshot => {
      dispatch({ type: HORA_UPDATE, payload: snapshot });
    });

export const buscarDetalleApuestas = (quinielaid, nombreapuesta) => dispatch =>
  firebase
    .database()
    .ref(`/quinielas/${quinielaid}/clasificacion/${nombreapuesta}/partidos`)
    // .ref(`master/torneos/idTorneo2/partidos`)
    .once("value", snapshot => {
      dispatch({
        type: BUSCAR_DETALLE_APUESTAS_EXITO,
        payload: snapshot.val()
      });
    });

export const buscarPorActivar = quiniela => dispatch => {
  firebase
    .database()
    .ref(`/quinielas/${quiniela}/info/quinielasPorActivar`)
    .on("value", snapshot => {
      if (snapshot.exists()) {
        dispatch({
          type: ACTIVACION_UPDATE_POR_ACTIVAR,
          payload: snapshot.val()
        });
      }
    });
};

export const buscarActivos = quiniela => dispatch => {
  firebase
    .database()
    .ref(`/quinielas/${quiniela}/info/quinielasActivos`)
    .on("value", snapshot => {
      if (snapshot.exists()) {
        dispatch({
          type: ACTIVACION_UPDATE_ACTIVOS,
          payload: snapshot.val()
        });
      }
    });
};

export const buscarDisponiblesq = quiniela => dispatch => {
  // console.log(quiniela);
  const q = quiniela;

  return firebase
    .database()
    .ref(`/quinielas/${quiniela.quinielaID}/info/quinielasDisponibles`)
    .once("value", snapshot => {
      if (snapshot.exists()) {
        q.quinielasDisponibles = snapshot.val();
        //   console.log(q);
        dispatch({
          type: UPDATE_DISPO,
          payload: q
        });
      }
    });
};

export const buscarJugadoresAdministradas = quiniela => dispatch => {
  firebase
    .database()
    .ref(`/quinielas/${quiniela}/clasificacion/`)
    .orderByKey()

    .limitToLast(15)
    .once("value", snapshot => {
      if (snapshot.exists()) {
        const tt = _.map(snapshot.val(), (val, uid) => ({ ...val, uid }));

        const dd = tt.reverse();
        const dd1 = dd.pop().uid;

        dispatch({
          type: ULTIMA_JUGADOR_LLEGO_NO
        });
        dispatch({
          type: MOSTRAR_TODAS_JUGADOR_ADMIN
        });
        dispatch({
          type: BUSCAR_JUGADORES_ADMINISTRADAS_EXITO,
          payload: snapshot.val()
        });

        dispatch({
          type: ULTIMA_JUGADOR_UPDATE,
          payload: dd1
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

export const buscarJugadoresAdministradasMax = (max, quiniela) => dispatch => {
  firebase
    .database()
    .ref(`/quinielas/${quiniela}/clasificacion/`)
    .orderByKey()
    .endAt(max)
    .limitToLast(15)
    .once("value", snapshot => {
      if (snapshot.exists()) {
        const tt = _.map(snapshot.val(), (val, uid) => ({ ...val, uid }));

        const dd = tt.reverse();
        const dd1 = dd.pop().uid;

        // console.log(`APUNTADOR CON MAX ${dd1}`);
        dispatch({
          type: ULTIMA_JUGADOR_LLEGO_NO
        });
        dispatch({
          type: ULTIMA_JUGADOR_UPDATE,
          payload: dd1
        });
        dispatch({
          type: BUSCAR_JUGADORES_ADMINISTRADAS_EXITO,
          payload: snapshot.val()
        });

        if (Object.keys(snapshot.val()).length < 15) {
          dispatch({ type: ULTIMA_JUGADOR_LLEGO });
          dispatch({ type: MOSTRAR_TODAS_JUGADOR_ADMIN });
        } else {
          dispatch({ type: OCULTAR_ULTIMA_JUGADOR_ADMIN });
        }
      }
    });
};

export const buscarJugadoresAdministradasT = (
  queryText,
  quiniela
) => dispatch => {
  firebase
    .database()
    .ref(`/quinielas/${quiniela}/clasificacion/`)
    .limitToFirst(15)
    .orderByChild("nombre")
    .startAt(queryText)
    .endAt(`${queryText}\uf8ff`)

    .once("value", snapshot => {
      if (snapshot.exists()) {
        const tt = _.map(snapshot.val(), (val, uid) => ({ ...val, uid }));
        const dd = tt;
        const dd1 = dd.pop().nombre;
        // console.log(`APUNTADOR INICIAL CON BUSQUEDA TEXTO ${dd1}`);
        dispatch({
          type: ULTIMA_JUGADOR_LLEGO_NO
        });

        dispatch({ type: RESET_JUGADORES_ADMIN });
        dispatch({
          type: BUSCAR_JUGADORES_ADMINISTRADAS_EXITO,
          payload: snapshot.val()
        });
        dispatch({
          type: ULTIMA_JUGADOR_UPDATE,
          payload: dd1
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
  return dispatch => {
    firebase
      .database()
      .ref(`/quinielas/${quiniela}/clasificacion/`)
      .orderByChild("nombre")
      .startAt(max)
      .endAt(`${queryText}\uf8ff`)
      .limitToFirst(15)
      .once("value", snapshot => {
        if (snapshot.exists()) {
          const tt = _.map(snapshot.val(), (val, uid) => ({ ...val, uid }));
          const dd = tt.reverse();
          const dd1 = dd.pop().nombre;
          // console.log(`APUNTADOR sec CON BUSQUEDA TEXTO ${dd1}`);
          dispatch({
            type: ULTIMA_JUGADOR_LLEGO_NO
          });
          dispatch({
            type: ULTIMA_JUGADOR_UPDATE,
            payload: dd1
          });
          dispatch({
            type: BUSCAR_JUGADORES_ADMINISTRADAS_EXITO,
            payload: snapshot.val()
          });
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

export const manejarDisponibles = (qu, e1) => dispatch =>
  firebase
    .database()
    .ref(`/quinielas/${qu}/info/`)
    .transaction(
      currentData => {
        // console.log(`EEEEEEEEEEEEEEEEE1 ${e1}`);

        if (e1) {
          currentData.quinielasDisponibles =
            Number(currentData.quinielasDisponibles) - 1;
          currentData.quinielasActivos =
            Number(currentData.quinielasActivos) + 1;
          currentData.quinielasPorActivar =
            Number(currentData.quinielasPorActivar) - 1;

          return currentData;
        }
        currentData.quinielasDisponibles =
          Number(currentData.quinielasDisponibles) + 1;
        currentData.quinielasActivos = Number(currentData.quinielasActivos) - 1;
        currentData.quinielasPorActivar =
          Number(currentData.quinielasPorActivar) + 1;

        return currentData;
      },

      // Abort the transaction.
      (error, committed, snapshot) => {
        if (error) {
          //    console.log('Transaction failed abnormally!', error);
        } else if (!committed) {
          //     console.log('We aborted the transaction (because ada already exists).');
        } else {
          // console.log('User ada added!');
        }
        dispatch({
          type: ACTUALIZAR_CODIGO_QUINIELA,
          payload: snapshot
        });
        // console.log("Ada's data: ", snapshot.val());
      }
    );

export const reducirDisponibles = qu => dispatch =>
  firebase
    .database()
    .ref(`/quinielas/${qu}/info/`)
    .transaction(
      currentData => {
        Number((currentData.quinielasPorActivar -= 1));

        return currentData;
      },

      // Abort the transaction.
      (error, committed, snapshot) => {
        if (error) {
          //   console.log('Transaction failed abnormally!', error);
        } else if (!committed) {
          //   console.log('We aborted the transaction (because ada already exists).');
        } else {
          //   console.log('User adahksjfhksjdfhksdjfhjksdfhkdjfh added!');
        }
        dispatch({
          type: ACTUALIZAR_CODIGO_QUINIELA,
          payload: snapshot
        });
        // console.log("Ada's data: ", snapshot.val());
      }
    );

export const reducirPorActivar = qu => dispatch =>
  firebase
    .database()
    .ref(`/quinielas/${qu}/info/`)
    .transaction(
      currentData => {
        Number((currentData.quinielasPorActivar -= 1));

        return currentData;
      },

      // Abort the transaction.
      (error, committed, snapshot) => {
        if (error) {
          //   console.log('Transaction failed abnormally!', error);
        } else if (!committed) {
          //   console.log('We aborted the transaction (because ada already exists).');
        } else {
          //   console.log('User adahksjfhksjdfhksdjfhjksdfhkdjfh added!');
        }
        dispatch({
          type: ACTUALIZAR_CODIGO_QUINIELA,
          payload: snapshot
        });
        // console.log("Ada's data: ", snapshot.val());
      }
    );

export const cambiarEstatusQuiniela = (
  apuesta,
  quiniela,
  status,
  info
) => dispatch => {
  apuesta.activo = status;
  apuesta.cargando = true;
  dispatch({ type: CAMBIAR_ESTATUS_JUGADOR, payload: apuesta });
  // console.log(`INFOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO ${info}`);
  const a = info.quinielasActivos;

  if (typeof apuesta.partidos === "undefined") {
    apuesta.partidos = {};
  }
  const postData = {
    activo: apuesta.activo,
    nombreapuesta: apuesta.nombreapuesta,
    puntos: apuesta.puntos,
    jid: apuesta.jid,
    quinielaNombre: apuesta.quinielaNombre,
    torneo: apuesta.torneo,
    torneoid: apuesta.torneoid,
    codigoq: info.codigoq,
    quinielaID: info.quinielaID,
    quiniela: info.quinielaID,
    partidos: apuesta.partidos,
    apuestaid: apuesta.apuestaid
  };

  const postData1 = {
    apuestaid: apuesta.apuestaid,
    admin: info.admin,
    adminr: info.adminr,
    codigoq: info.codigoq,
    quinielaID: info.quinielaID,
    quinielaNombre: apuesta.quinielaNombre,
    quinielaNombrer: info.quinielaNombrer,
    torneo: apuesta.torneo,
    torneoid: apuesta.torneoid,
    quinielasDisponibles: info.quinielasDisponibles,
    quinielasPorActivar: info.quinielasPorActivar,
    quinielasActivos: a
  };
  const postData2 = info.quinielasDisponibles;
  const postData3 = a;
  console.log(apuesta.jid);
  console.log(apuesta.uid);
  console.log(info.admin);
  console.log(info.quinielaID);

  console.log(postData);

  // Write the new post's data simultaneously in the posts list and the user's post list.
  const updates = {};
  updates[`/users/${apuesta.jid}/quinielas/${apuesta.apuestaid}`] = postData;
  updates[
    `/users/${info.admin}/quinielasadministradas/${info.quinielaID}`
  ] = postData1;
  updates[
    `/quinielas/${info.quinielaID}/clasificacion/${apuesta.uid}`
  ] = postData;

  return firebase
    .database()
    .ref()
    .update(updates)
    .then(error => {
      // console.log(`jalksjdlkasjdlkasjdlasjdlksad ${error}`);
      crearQuinielaExito(dispatch, apuesta);
    })
    .catch(error => crearQuinielaError(dispatch, error));
};

export const cambiarEstatusQuinielaA = (quiniela, info, ju) => dispatch => {
  const a = info.quinielasActivos;

  const postData1 = {
    admin: info.admin,
    adminr: info.adminr,
    codigoq: info.codigoq,
    quinielaID: info.quinielaID,
    quinielaNombre: info.quinielaNombre,
    quinielaNombrer: info.quinielaNombrer,
    torneo: info.torneo,
    torneoid: info.torneoid,
    quinielasDisponibles: info.quinielasDisponibles,
    quinielasPorActivar: info.quinielasPorActivar,
    quinielasActivos: a,
    reglas: info.reglas
  };

  // Write the new post's data simultaneously in the posts list and the user's post list.
  const updates = {};
  //updates[`quinielas/${info.quinielaID}/info`] = postData1;
  updates[`users/${info.admin}/quinielasadministradas/${quiniela}`] = postData1;

  return firebase
    .database()
    .ref()
    .update(updates)
    .then(error => {
      // console.log(`jalksjdlkasjdlkasjdlasjdlksad ${error}`);
      crearQuinielaExito(dispatch, apuesta);
    })
    .catch(error => crearQuinielaError(dispatch, error));
};

function crearQuinielaExito(dispatch, apuesta) {
  apuesta.cargando = false;
  return dispatch({ type: CAMBIAR_ESTATUS_JUGADOR, payload: apuesta });
}

const crearQuinielaError = (dispatch, error) => {
  // dispatch({ type: CREATE_QUINIELA_FAIL, payload: error });
};

export const reloadingJugadores = () => ({
  type: RELOADING_JUGADORES
});
