import firebase from 'firebase';
import _ from 'lodash';
import { generarCodigo } from '../comun/helper';
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
  CAMBIAR_ID_TORNEO,
  ID_TORNEO_CAMBIO,
  ACTUALIZAR_CODIGO_QUINIELA,
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
      .once('value', (snapshot) => {
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
      .once('value', (snapshot) => {
        if (snapshot.exists()) {
          const tt = _.map(snapshot.val(), (val, uid) => ({ ...val, uid }));

          const dd = tt.reverse();
          const dd1 = dd.pop().uid;
          // console.log(`APUNTADOR INICIAL  ${dd1}`);

          // const root = snapshot.ref.root;

          // dd.map((q, index, array) => {
          // const mgr_promise = root.child(`/torneos/${q.torneo}/`).once('value');
          // let arr1 = [];
          // mgr_promise.then((snap) => {
          // q.torneo = snap.val().info.nombre;

          // array[index].torneo = snap.val().info.nombre;
          // console.log(array);
          // arr1 = array.slice(index, index + 1);

          // dispatch({
          //  type: BUSCAR_QUINIELAS_ADMINISTRADAS_EXITO,
          //  payload: _.keyBy(arr1, 'uid'),
          // });
          // });
          // });

          // console.log('ASHKJHSAKJHKJAKJAD');
          // console.log(_.keyBy(dd, 'uid'));

          dispatch({
            type: ULTIMA_QUINIELA_LLEGO_NO,
          });
          dispatch({
            type: MOSTRAR_TODAS_QUINIELA_ADMIN,
          });
          dispatch({
            type: BUSCAR_QUINIELAS_ADMINISTRADAS_EXITO,
            payload: snapshot.val(),
          });

          dispatch({
            type: ULTIMA_QUINIELA_UPDATE,
            payload: dd1,
          });
        }

        if (snapshot.exists()) {
          // console.log(`TAMANO DE LA DATA ${Object.keys(snapshot.val()).length}`);
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

async function cambiarT(dispatch, t) {
  const x = await cambiarTorneo(dispatch, t);
}

export const cambiarTorneo = (dispatch, q) => {
  const r = q;
  // console.log(r);
  firebase
    .database()
    .ref(`/torneos/${q.torneo}/`)

    .once('value', (snapshot) => {
      if (snapshot.exists()) {
        q.torneo = snapshot.val().info.nombre;
        dispatch({
          type: CAMBIAR_ID_TORNEO,
          payload: q,
        });
      }
    });
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
      .once('value', (snapshot) => {
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
            dispatch({ type: MOSTRAR_TODAS_QUINIELA_ADMIN });
          } else {
            dispatch({ type: OCULTAR_ULTIMA_QUINIELA_ADMIN });
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

export const idTorneoCambio = text => ({
  type: ID_TORNEO_CAMBIO,
  payload: text,
});

export const crearQuiniela = ({
  quinielaNombre, torneo, torneoid, codigoq,
}) => (dispatch) => {
  const { currentUser } = firebase.auth();

  // Get a key for a new Post.
  const newPostKey = firebase
    .database()
    .ref()
    .child('posts')
    .push().key;

  const adminr = currentUser.uid + newPostKey;
  const quinielaNombrer = quinielaNombre + newPostKey;
  const quinielaID = newPostKey;
  const recibirAbonados = true;
  const postData = {
    quinielaNombre,
    torneo,
    torneoid,
    admin: currentUser.uid,
    adminr,
    quinielaNombrer,
    codigoq,
    quinielaID,
  };
  const postData1 = {
    recibirAbonados,
    quinielaID,
  };

  // Write the new post's data simultaneously in the posts list and the user's post list.
  const updates = {};

  updates[`/users/${currentUser.uid}/quinielasadministradas/${newPostKey}`] = postData;
  updates[`/quinielas/${newPostKey}`] = postData;
  updates[`/quinielas/codigos/${codigoq}`] = postData1;

  return firebase
    .database()
    .ref()
    .update(updates)
    .then((snap) => {
      asignarCodigoQuiniela(codigoq, newPostKey);
    })
    .catch(error => crearQuinielaError(dispatch, error));
};

export const agregarJugador = quiniela => (dispatch) => {
  const { currentUser } = firebase.auth();

  const newPostKey = firebase
    .database()
    .ref()
    .child('posts')
    .push().key;

  const postData = {
    puntos: 0,
    activo: false,
    jid: currentUser.uid,
    nombre: 'Pedro Pablo',
  };

  // Write the new post's data simultaneously in the posts list and the user's post list.
  const updates = {};
  updates[`/quinielas/${quiniela}/clasificacion/${newPostKey}`] = postData;

  return firebase
    .database()
    .ref()
    .update(updates)
    .then((snap) => {
      // asignarCodigoQuiniela(codigoq, newPostKey);
    })
    .catch(error => crearQuinielaError(dispatch, error));
};

export const asignarCodigoQuiniela = ({ codigoq, newPostKey }) => (dispatch) => {
  const postData1 = {
    [codigoq]: newPostKey,
  };

  // Write the new post's data simultaneously in the posts list and the user's post list.

  const updates1 = {};

  updates1['/quinielas/codigos'] = postData1;

  return firebase
    .database()
    .ref()
    .update(updates1)
    .then((snap) => {
      crearQuinielaExito(dispatch);
    })
    .catch(error => crearQuinielaError(dispatch, error));
};

export const crearCodigoQuiniela = codigo => (dispatch) => {
  const codigoNew = generarCodigo();

  return firebase
    .database()
    .ref(`/quinielas/codigos/${codigoNew}`)
    .transaction(
      (currentData) => {
        const test = {
          1234: 32323,
          4321: 34234234,
          5345: 345345345,
          5453: 53453453,
        };

        if (currentData === null) {
          return codigoNew;
        }
      },

      // Abort the transaction.
      (error, committed, snapshot) => {
        if (error) {
          console.log('Transaction failed abnormally!', error);
        } else if (!committed) {
          console.log('We aborted the transaction (because ada already exists).');
        } else {
          console.log('User ada added!');
        }
        dispatch({
          type: ACTUALIZAR_CODIGO_QUINIELA,
          payload: codigoNew,
        });
        // console.log("Ada's data: ", snapshot.val());
      },
    );
};

const crearQuinielaExito = (dispatch) => {
  // dispatch({ type: GO_TO_ADMINISTRADAS });
};

const crearQuinielaError = (dispatch, error) => {
  dispatch({ type: CREATE_QUINIELA_FAIL, payload: error });
};
