import firebase from "firebase"
import _ from "lodash"
import { generarCodigo } from "../comun/helper"
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
  BUSCAR_REGLAS_EXITO,
  ACTUALIZAR_NOMBRE_QUINIELA,
  BUSCAR_DISPONIBLES_EXITO,
  QUINIELA_UPDATE_ID,
  BUSCAR_POSICIONES_EXITO,
  BUSCAR_DETALLEADMIN_EXITO
} from "./types"

export const QuinielaUpdate = ({ prop, value }) => ({
  type: QUINIELA_UPDATE,
  payload: { prop, value }
})

export const BuscarQuinielaTexto = value => ({
  type: BUSCAR_QUINIELA_UPDATE,
  payload: value
})

export const modificarquiniela = value => ({
  type: QUINIELA_UPDATE_ID,
  payload: value
})

export const buscarQuinielas = uid => dispatch =>
  firebase
    .database()
    .ref(`/users/${uid}/quinielas`)
    .once("value", snapshot => {
      dispatch({ type: BUSCAR_QUINIELAS_EXITO, payload: snapshot.val() })
    })

export const buscarQuinielasAdminTorneo = (torneo, uid) => dispatch =>
  firebase
    .database()
    .ref(`/users/${uid}/quinielasadministradas`)
    .orderByChild("torneoid")
    .equalTo(`${torneo}`)
    .once("value", snapshot => {
      //dispatch({ type: BUSCAR_QUINIELAS_EXITO, payload: snapshot.val() });
    })

export const buscarQuinielasAdminQuiniela = (quiniela, uid) => dispatch =>
  firebase
    .database()
    .ref(`/users/${uid}/quinielas`)
    .orderByChild("quiniela")
    .equalTo(`${quiniela}`)
    .once("value", snapshot => {
      //dispatch({ type: BUSCAR_QUINIELAS_EXITO, payload: snapshot.val() });
    })

export const buscarPosiciones = qid => dispatch =>
  firebase
    .database()
    .ref(`/quinielas/${qid}/clasificacion`)
    .orderByChild("puntos")
    .once("value", snapshot => {
      dispatch({ type: BUSCAR_POSICIONES_EXITO, payload: snapshot.val() })
    })

export const buscarQuinielasAdministradasT = queryText => {
  const { currentUser } = firebase.auth()

  return dispatch => {
    firebase
      .database()
      .ref(`/users/${currentUser.uid}/quinielasadministradas/`)
      .limitToFirst(15)
      .orderByChild("quinielaNombrer")
      .startAt(queryText)
      .endAt(`${queryText}\uf8ff`)

      .once("value", snapshot => {
        if (snapshot.exists()) {
          const tt = _.map(snapshot.val(), (val, uid) => ({ ...val, uid }))
          const dd = tt
          const dd1 = dd.pop().quinielaNombrer
          // console.log(`APUNTADOR INICIAL CON BUSQUEDA TEXTO ${dd1}`);
          dispatch({
            type: ULTIMA_QUINIELA_LLEGO_NO
          })

          dispatch({ type: RESET_QUINIELAS_ADMIN })
          dispatch({
            type: BUSCAR_QUINIELAS_ADMINISTRADAS_EXITO,
            payload: snapshot.val()
          })
          dispatch({
            type: ULTIMA_QUINIELA_UPDATE,
            payload: dd1
          })
          dispatch({ type: MOSTRAR_TODAS_QUINIELA_ADMIN })
        } else {
          dispatch({ type: RESET_QUINIELAS_ADMIN })
        }

        if (snapshot.exists()) {
          // console.log(`TAMOANO DE QUINIELAS BUSQUEDA TEXTO INICIAL  ${Object.keys(snapshot.val()).length}`);
          if (Object.keys(snapshot.val()).length < 15) {
            dispatch({ type: ULTIMA_QUINIELA_LLEGO })
            dispatch({ type: MOSTRAR_TODAS_QUINIELA_ADMIN })
          } else {
            dispatch({ type: OCULTAR_ULTIMA_QUINIELA_ADMIN })
          }
        }
      })
  }
}

export const buscarQuinielasAdministradasMaxT = (max, queryText) => {
  const { currentUser } = firebase.auth()
  return dispatch => {
    firebase
      .database()
      .ref(`/users/${currentUser.uid}/quinielasadministradas/`)
      .orderByChild("quinielaNombrer")
      .startAt(max)
      .endAt(`${queryText}\uf8ff`)
      .limitToFirst(15)
      .once("value", snapshot => {
        if (snapshot.exists()) {
          const tt = _.map(snapshot.val(), (val, uid) => ({ ...val, uid }))
          const dd = tt.reverse()
          const dd1 = dd.pop().quinielaNombrer
          // console.log(`APUNTADOR sec CON BUSQUEDA TEXTO ${dd1}`);
          dispatch({
            type: ULTIMA_QUINIELA_LLEGO_NO
          })
          dispatch({
            type: ULTIMA_QUINIELA_UPDATE,
            payload: dd1
          })
          dispatch({
            type: BUSCAR_QUINIELAS_ADMINISTRADAS_EXITO,
            payload: snapshot.val()
          })
        }
        if (snapshot.exists()) {
          // console.log(`TAMOANO DE QUINIELAS BUSQUEDA TEXTO SIGUIENTE  ${Object.keys(snapshot.val()).length}`);
          if (Object.keys(snapshot.val()).length < 15) {
            dispatch({ type: ULTIMA_QUINIELA_LLEGO })
            dispatch({ type: MOSTRAR_TODAS_QUINIELA_ADMIN })
          } else {
            dispatch({ type: OCULTAR_ULTIMA_QUINIELA_ADMIN })
          }
        }
      })
  }
}

export const buscarQuinielasAdministradas1 = refdbj => dispatch =>
  refdbj.on("value", snapshot => {
    dispatch({
      type: BUSCAR_QUINIELAS_ADMINISTRADAS_EXITO,
      payload: snapshot.val()
    })
  })

export const buscarQuinielasAdministradas = uid => dispatch =>
  firebase
    .database()
    .ref(`/users/${uid}/quinielasadministradas/`)
    .once("value", snapshot => {
      dispatch({
        type: BUSCAR_QUINIELAS_ADMINISTRADAS_EXITO,
        payload: snapshot.val()
      })
    })

export const buscarQuinielasAdministradas2 = () => {
  const { currentUser } = firebase.auth()

  return dispatch => {
    firebase
      .database()
      .ref(`/users/${currentUser.uid}/quinielasadministradas/`)
      .orderByKey()

      .limitToLast(15)
      .once("value", snapshot => {
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
          type: ULTIMA_QUINIELA_LLEGO_NO
        })
        dispatch({
          type: MOSTRAR_TODAS_QUINIELA_ADMIN
        })
        dispatch({
          type: BUSCAR_QUINIELAS_ADMINISTRADAS_EXITO,
          payload: snapshot.val()
        })

        if (snapshot.exists()) {
          const tt = _.map(snapshot.val(), (val, uid) => ({ ...val, uid }))
          const dd = tt.reverse()
          const dd1 = dd.pop().uid
          dispatch({
            type: ULTIMA_QUINIELA_UPDATE,
            payload: dd1
          })
          // console.log(`TAMANO DE LA DATA ${Object.keys(snapshot.val()).length}`);
          if (Object.keys(snapshot.val()).length < 15) {
            dispatch({ type: ULTIMA_QUINIELA_LLEGO })
            dispatch({ type: MOSTRAR_TODAS_QUINIELA_ADMIN })
          } else {
            dispatch({ type: OCULTAR_ULTIMA_QUINIELA_ADMIN })
          }
        }
      })
  }
}

async function cambiarT(dispatch, t) {
  const x = await cambiarTorneo(dispatch, t)
}

export const cambiarTorneo = (dispatch, q) => {
  const r = q
  // console.log(r);
  firebase
    .database()
    .ref(`/torneos/${q.torneo}/`)

    .once("value", snapshot => {
      if (snapshot.exists()) {
        q.torneo = snapshot.val().info.nombre
        dispatch({
          type: CAMBIAR_ID_TORNEO,
          payload: q
        })
      }
    })
}

export const buscarQuinielasAdministradasMax = max => {
  const { currentUser } = firebase.auth()
  return dispatch => {
    firebase
      .database()
      .ref(`/users/${currentUser.uid}/quinielasadministradas/`)
      .orderByKey()
      .endAt(max)
      .limitToLast(15)
      .once("value", snapshot => {
        if (snapshot.exists()) {
          const tt = _.map(snapshot.val(), (val, uid) => ({ ...val, uid }))

          const dd = tt.reverse()
          const dd1 = dd.pop().uid

          // console.log(`APUNTADOR CON MAX ${dd1}`);
          dispatch({
            type: ULTIMA_QUINIELA_LLEGO_NO
          })
          dispatch({
            type: ULTIMA_QUINIELA_UPDATE,
            payload: dd1
          })
          dispatch({
            type: BUSCAR_QUINIELAS_ADMINISTRADAS_EXITO,
            payload: snapshot.val()
          })

          if (Object.keys(snapshot.val()).length < 15) {
            dispatch({ type: ULTIMA_QUINIELA_LLEGO })
            dispatch({ type: MOSTRAR_TODAS_QUINIELA_ADMIN })
          } else {
            dispatch({ type: OCULTAR_ULTIMA_QUINIELA_ADMIN })
          }
        }
      })
  }
}

export const ultimaQuinielasAdministrada = last => ({
  type: ULTIMA_QUINIELA_UPDATE,
  payload: last
})

export const ultimaQuinielasLlego = () => ({
  type: ULTIMA_QUINIELA_LLEGO
})

export const reloadingQuinielas = () => ({
  type: RELOADING
})

export const ultimaQuinielasLlegoNo = () => ({
  type: ULTIMA_QUINIELA_LLEGO_NO
})

export const resetQuinielasAdmin = () => ({
  type: RESET_QUINIELAS_ADMIN
})

export const reloadedQuinielasAdmin = () => ({
  type: RELOADED_QUINIELAS_ADMIN
})

export const nombreQuinielaCambio = text => ({
  type: NOMBRE_QUINIELA_CAMBIO,
  payload: text
})

export const nombreTorneoCambio = text => ({
  type: NOMBRE_TORNEO_CAMBIO,
  payload: text
})

export const idTorneoCambio = text => ({
  type: ID_TORNEO_CAMBIO,
  payload: text
})

export const crearNombreQuiniela = (quiniela, nombre) => dispatch =>
  firebase
    .database()
    .ref(`/quinielas/${quiniela}/clasificacion/${nombre}`)
    .transaction(
      currentData => {
        if (currentData === null) {
          return nombre
        }
      },

      // Abort the transaction.
      (error, committed, snapshot) => {
        if (error) {
          //   console.log('Transaction failed abnormally!', error);
        } else if (!committed) {
          //   console.log('We aborted the transaction (because ada already exists).');
        } else {
          //   console.log('User ada added!');
        }
        //   dispatch({
        //     type: ACTUALIZAR_NOMBRE_QUINIELA,
        //     payload: nombre
        //  });
        // console.log("Ada's data: ", snapshot.val());
      }
    )

export const validarUsuario = (quiniela, nombre) => dispatch =>
  firebase
    .database()
    .ref(`/quinielas/${quiniela}/clasificacion/${nombre.nombreapuesta}/activo`)
    .once("value", snapshot => {
      dispatch({ type: ACTUALIZAR_NOMBRE_QUINIELA, payload: nombre })
    })

export const borrarNombreQuiniela = (quiniela, nombre) => dispatch =>
  firebase
    .database()
    .ref(`/quinielas/${quiniela}/clasificacion/${nombre}`)
    .remove()

export const crearNombreQuinielaLocal = (quiniela, nombre) => dispatch => {
  const { currentUser } = firebase.auth()
  return firebase
    .database()
    .ref(`/user/${currentUser.uid}/quinielas/${nombre}`)
    .transaction(
      currentData => {
        if (currentData === null) {
          return nombre
        }
      },

      // Abort the transaction.
      (error, committed, snapshot) => {
        if (error) {
          //   console.log('Transaction failed abnormally!', error);
        } else if (!committed) {
          //   console.log('We aborted the transaction (because ada already exists).');
        } else {
          //   console.log('User ada added!');
        }
        dispatch({
          type: ACTUALIZAR_NOMBRE_QUINIELA,
          payload: nombre
        })
        // console.log("Ada's data: ", snapshot.val());
      }
    )
}

export const manejarActivos = quiniela => dispatch =>
  firebase
    .database()
    .ref(`/quinielas/${quiniela}/info/quinielasPorActivar`)
    .transaction(
      currentData => Number(currentData) + 1,

      // Abort the transaction.
      (error, committed, snapshot) => {
        if (error) {
          //    console.log('Transaction failed abnormally!', error);
        } else if (!committed) {
          //   console.log('We aborted the transaction (because ada already exists).');
        } else {
          //  console.log('User ada added!');
        }
        //  dispatch({
        //   type: ACTUALIZAR_NOMBRE_QUINIELA,
        //  payload: snapshot
        //  });
        // console.log("Ada's data: ", snapshot.val());
      }
    )

export const manejarActivosA = (quiniela, admin, pora) => dispatch =>
  firebase
    .database()
    .ref(
      `/users/${admin}/quinielasadministradas/${quiniela}/quinielasPorActivar`
    )
    .transaction(
      currentData => Number(pora),

      // Abort the transaction.
      (error, committed, snapshot) => {
        if (error) {
          //    console.log('Transaction failed abnormally!', error);
        } else if (!committed) {
          //    console.log('We aborted the transaction (because ada already exists).');
        } else {
          //    console.log('User ada added!');
        }
        //  dispatch({
        //    type: ACTUALIZAR_NOMBRE_QUINIELA,
        //    payload: snapshot
        //  });
        // console.log("Ada's data: ", snapshot.val());
      }
    )

export const crearQuiniela = ({
  quinielaNombre,
  torneo,
  torneoid,
  codigoq,
  reglas,
  disponible
}) => dispatch => {
  const { currentUser } = firebase.auth()

  // Get a key for a new Post.
  const newPostKey = firebase
    .database()
    .ref()
    .child("posts")
    .push().key

  const adminr = currentUser.uid + newPostKey
  const quinielaNombrer = quinielaNombre + newPostKey
  const quinielaID = newPostKey
  const recibirAbonados = true
  const postData = {
    quinielaNombre,
    torneo,
    torneoid,
    admin: currentUser.uid,
    adminr,
    quinielaNombrer,
    codigoq,
    quinielaID,
    reglas,
    quinielasDisponibles: disponible,
    quinielasActivos: "0",
    quinielasCompradas: disponible,
    quinielasPorActivar: "0"
  }
  const postData2 = {
    quinielaNombre,
    torneo,
    torneoid,
    admin: currentUser.uid,
    adminr,
    quinielasDisponibles: disponible,
    quinielasCompradas: disponible,
    quinielasActivos: "0",
    quinielasPorActivar: "0",
    quinielaNombrer,
    codigoq,
    quinielaID
  }
  const postData1 = {
    recibirAbonados,
    quinielaID
  }

  // Write the new post's data simultaneously in the posts list and the user's post list.
  const updates = {}

  updates[
    `/users/${currentUser.uid}/quinielasadministradas/${newPostKey}`
  ] = postData2
  updates[`/quinielas/${newPostKey}/info`] = postData
  updates[`/quinielas/codigos/${codigoq}`] = postData1

  return firebase
    .database()
    .ref()
    .update(updates)
    .then(snap => {
      asignarCodigoQuiniela(codigoq, newPostKey)
    })
    .catch(error => crearQuinielaError(dispatch, error))
}

export const agregarJugador = (
  quiniela,
  nombreapuesta,
  torneo,
  torneoid,
  quinielaNombre,
  partidos,
  codigoq
) => dispatch => {
  const { currentUser } = firebase.auth()

  const newPostKey = firebase
    .database()
    .ref()
    .child("posts")
    .push().key

  const postData = {
    puntos: 0,
    activo: false,
    jid: currentUser.uid,
    nombreapuesta,
    torneo,
    torneoid,
    quinielaNombre,
    quiniela,
    quinielaID: quiniela,
    codigoq,
    apuestaid: newPostKey
  }

  const postData1 = {
    puntos: 0,
    activo: false,
    jid: currentUser.uid,
    nombreapuesta,
    torneo,
    torneoid,
    quinielaNombre,
    quiniela,
    quinielaID: quiniela,
    codigoq,
    apuestaid: newPostKey
  }

  // Write the new post's data simultaneously in the posts list and the user's post list.
  const updates = {}
  updates[`/quinielas/${quiniela}/clasificacion/${nombreapuesta}`] = postData1

  updates[`/users/${currentUser.uid}/quinielas/${newPostKey}`] = postData

  return firebase
    .database()
    .ref()
    .update(updates)
    .then(snap => {
      // asignarCodigoQuiniela(codigoq, newPostKey);
    })
    .catch(error => crearQuinielaError(dispatch, error))
}

export const asignarCodigoQuiniela = ({ codigoq, newPostKey }) => dispatch => {
  const postData1 = {
    [codigoq]: newPostKey
  }

  // Write the new post's data simultaneously in the posts list and the user's post list.

  const updates1 = {}

  updates1["/quinielas/codigos"] = postData1

  return firebase
    .database()
    .ref()
    .update(updates1)
    .then(snap => {
      crearQuinielaExito(dispatch)
    })
    .catch(error => crearQuinielaError(dispatch, error))
}

export const bloquearPartido = tid => dispatch => {
  const postData1 = 1

  // Write the new post's data simultaneously in the posts list and the user's post list.

  const updates1 = {}

  updates1[`/torneos/${tid}/actualizarBloqueos`] = postData1

  return firebase
    .database()
    .ref()
    .update(updates1)
    .then(snap => {
      //crearQuinielaExito(dispatch);
    })
    .catch(error => crearQuinielaError(dispatch, error))
}

export const actualizarPuntos = tid => dispatch => {
  const postData1 = 1

  // Write the new post's data simultaneously in the posts list and the user's post list.

  const updates1 = {}

  updates1[`/torneos/${tid}/actualizarPuntos`] = postData1

  return firebase
    .database()
    .ref()
    .update(updates1)
    .then(snap => {
      //crearQuinielaExito(dispatch);
    })
    .catch(error => crearQuinielaError(dispatch, error))
}

export const crearCodigoQuiniela = () => dispatch => {
  const codigoNew = generarCodigo()

  return firebase
    .database()
    .ref(`/quinielas/codigos/${codigoNew}`)
    .transaction(
      currentData => {
        if (currentData === null) {
          console.log("El código no está en uso: ", codigoNew)
          return codigoNew
        } else {
          console.log("Código ya existente: ", codigoNew)
        }
      },

      // Abort the transaction.
      (error, committed, snapshot) => {
        if (error) {
          //   console.log('Transaction failed abnormally!', error);
        } else if (!committed) {
          //   console.log('We aborted the transaction (because ada already exists).');
        } else {
          //  console.log('User ada added!');
        }
        dispatch({
          type: ACTUALIZAR_CODIGO_QUINIELA,
          payload: codigoNew
        })
        // console.log("Ada's data: ", snapshot.val());
      }
    )
}

export const buscarReglas = torneoid => dispatch =>
  firebase
    .database()
    .ref(`/torneos/${torneoid}/reglasPorDefecto`)
    .once("value", snapshot => {
      dispatch({ type: BUSCAR_REGLAS_EXITO, payload: snapshot.val() })
    })

export const buscarDisponiblesDemo = torneoid => dispatch =>
  firebase
    .database()
    .ref(`/torneos/${torneoid}/disponible`)
    .once("value", snapshot => {
      dispatch({ type: BUSCAR_DISPONIBLES_EXITO, payload: snapshot.val() })
    })

export const buscarActivacionesDB = torneoid => dispatch =>
  firebase
    .database()
    .ref(`/torneos/${torneoid}/maximo`)
    .once("value", snapshot => {
      //dispatch({ type: BUSCAR_DISPONIBLES_EXITO, payload: snapshot.val() });
    })

export const buscarReglasAdmin = qid => dispatch =>
  firebase
    .database()
    .ref(`/quinielas/${qid}/info/reglas`)
    .once("value", snapshot => {
      dispatch({ type: BUSCAR_REGLAS_EXITO, payload: snapshot.val() })
    })

export const buscarDetalleAdmin = admin => dispatch =>
  firebase
    .database()
    .ref(`/users/${admin}/info`)
    .once("value", snapshot => {
      dispatch({ type: BUSCAR_DETALLEADMIN_EXITO, payload: snapshot.val() })
    })

const crearQuinielaExito = dispatch => {
  // dispatch({ type: GO_TO_ADMINISTRADAS });
}

const crearQuinielaError = (dispatch, error) => {
  dispatch({ type: CREATE_QUINIELA_FAIL, payload: error })
}

export const buscarQuiniela = quiniela => dispatch =>
  firebase
    .database()
    .ref(`/quinielas/${quiniela}/info`)
    .once("value", snapshot => {
      // dispatch({
      //   type: ULTIMA_QUINIELA_LLEGO_NO
      //  });
    })

export const buscarAdmin = uid => dispatch =>
  firebase
    .database()
    .ref(`/users/${uid}/info`)
    .once("value", snapshot => {
      // dispatch({
      //   type: ULTIMA_QUINIELA_LLEGO_NO
      //  });
    })
