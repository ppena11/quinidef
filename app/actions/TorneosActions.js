import firebase from 'firebase';
import { BUSCAR_TORNEOS_EXITO } from './types';

export const buscarTorneos = () => (dispatch) => {
  firebase
    .database()
    .ref('/torneos')
    .once('value', (snapshot) => {
      dispatch({ type: BUSCAR_TORNEOS_EXITO, payload: snapshot.val() });
    });
};
