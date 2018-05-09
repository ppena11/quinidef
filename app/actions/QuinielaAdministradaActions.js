import firebase from "firebase";

import {
  QUINIELA_ADMINISTRADA_UPDATE,
  ESCONDER_MENU_QUINIELA_ADMIN,
  MOSTRAR_MENU_QUINIELA_ADMIN,
  MODIFICAR_REGLAS,
  REINICIAR_REGLAS,
  MODIFICAR_APUESTAS
} from "./types";

export const QuinielaAdministradaUpdate = ({ prop, value }) => ({
  type: QUINIELA_ADMINISTRADA_UPDATE,
  payload: { prop, value }
});

export const mostrarMenu = () => ({
  type: MOSTRAR_MENU_QUINIELA_ADMIN
});
export const esconderMenu = () => ({
  type: ESCONDER_MENU_QUINIELA_ADMIN
});

export const modificarReglas = reglas => ({
  type: MODIFICAR_REGLAS,
  payload: reglas
});

export const modificarApuestas = (value, key) => ({
  type: MODIFICAR_APUESTAS,
  payload: {
    value,
    key
  }
});

export const reinicarReglas = () => ({
  type: REINICIAR_REGLAS
});

export const modifarReglasBD = (qid, reglas) => dispatch => {
  const postData = reglas;

  // Write the new post's data simultaneously in the posts list and the user's post list.
  const updates = {};

  updates[`/quinielas/${qid}/info/reglas`] = postData;

  return firebase
    .database()
    .ref()
    .update(updates)
    .then(snap => {
      // asignarCodigoQuiniela(codigoq, newPostKey);
    })
    .catch(error => crearQuinielaError(dispatch, error));
};

export const modificarApuestasBD = (qid, apuesta, apuestas) => dispatch => {
  const postData = {
    ...apuestas
  };

  // Write the new post's data simultaneously in the posts list and the user's post list.
  const updates = {};

  updates[`/quinielas/${qid}/clasificacion/${apuesta}/partidos`] = postData;

  return firebase
    .database()
    .ref(`/quinielas/${qid}/clasificacion/${apuesta}/partidos`)
    .update(postData)
    .then(snap => {
      // asignarCodigoQuiniela(codigoq, newPostKey);
    })
    .catch(error => crearQuinielaError(dispatch, error));
};
