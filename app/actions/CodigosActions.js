import firebase from 'firebase';

import { BUSCAR_CODIGOS_EXITO, BUSCAR_CODIGOS_NO_EXITO } from './types';

export const buscarCodigos = codigo => dispatch => firebase
  .database()
  .ref(`/quinielas/codigos/${codigo}/`)
  .once('value', (snapshot) => {
    if (snapshot.exists()) {
      dispatch({ type: BUSCAR_CODIGOS_EXITO, payload: snapshot.val() });
    } else {
      dispatch({ type: BUSCAR_CODIGOS_NO_EXITO });
    }
  });
