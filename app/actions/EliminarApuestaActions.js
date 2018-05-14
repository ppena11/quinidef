import firebase from "firebase";
import _ from "lodash";

import {
  CREATE_QUINIELA_FAIL,
  ULTIMA_QUINIELA_LLEGO_NO,
  ELIMINAR_JUGADOR
} from "./types";

export const eliminarJugador = (
  jugador,
  quiniela,
  quinielan,
  jugadores
) => dispatch => {
  const { currentUser } = firebase.auth();
  const postData1 = {};
  const updates = {};
  updates[
    `/quinielas/${quiniela}/clasificacion/${jugador.nombreapuesta}`
  ] = postData1;
  updates[`/users/${jugador.jid}/quinielas/${jugador.apuestaid}`] = postData1;

  // console.log(jugadores);
  const jug = jugadores;
  // console.log(jugador.uid);
  const uid = jugador.uid;
  //  console.log(uid);
  delete jug[uid];
  // console.log(jug);

  return firebase
    .database()
    .ref()
    .update(updates)
    .then(snap => {
      dispatch({
        type: ELIMINAR_JUGADOR,
        payload: jug
      });
    })
    .catch(error => crearQuinielaError(dispatch, error));
};

export const eliminarQuinielaAdministrada = quiniela => dispatch => {
  const { currentUser } = firebase.auth();
  const postData1 = {};
  const updates = {};
  updates[`/quinielas/${quiniela.quinielaID}`] = postData1;
  updates[
    `/users/${quiniela.admin}/quinielasadministradas/${quiniela.quinielaID}`
  ] = postData1;
  updates[`/quinielas/codigos/${quiniela.codigoq}`] = postData1;

  return firebase
    .database()
    .ref()
    .update(updates)
    .then(snap => {})
    .catch(error => crearQuinielaError(dispatch, error));
};

const crearQuinielaError = (dispatch, error) => {
  dispatch({ type: CREATE_QUINIELA_FAIL, payload: error });
};
