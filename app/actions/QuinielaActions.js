import firebase from 'firebase';
import {
  QUINIELA_UPDATE,
  BUSCAR_QUINIELAS_EXITO,
  BUSCAR_QUINIELAS_ADMINISTRADAS_EXITO,
  NOMBRE_QUINIELA_CAMBIO,
  NOMBRE_TORNEO_CAMBIO,
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

export const crearQuiniela = ({ quinielaNombre, torneo }) => {
  const { currentUser } = firebase.auth();
  return () => {
    firebase
      .database()
      .ref(`/users/${currentUser.uid}/quinielasadministradas`)
      .push({ quinielaNombre, torneo });
  };
};
