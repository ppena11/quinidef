import firebase from 'firebase';
import _ from 'lodash';

import { ELIMINAR_JUGADOR } from './types';

export const eliminarJugador = (jugador, quiniela, quinielan, jugadores) => {
  const { currentUser } = firebase.auth();
  return (dispatch) => {
    firebase
      .database()
      .ref(`/quinielas/${quiniela}/clasificacion/${jugador.uid}`)
      .remove((snapshot) => {
        console.log(jugadores);
        const jug = jugadores;
        console.log(jugador.uid);
        const uid = jugador.uid;
        console.log(uid);
        delete jug[uid];
        console.log(jug);
        dispatch({
          type: ELIMINAR_JUGADOR,
          payload: jug,
        });
      });
  };
};
