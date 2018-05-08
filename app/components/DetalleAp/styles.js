import EStyleSheet from "react-native-extended-stylesheet";
import color from "../../comun/colors";

export default EStyleSheet.create({
  container: {
    flexGrow: 1,
    flexDirection: "column",
    borderColor: color.$cardBorderColor,
    borderTopWidth: 1,
    marginRight: 5,
    marginLeft: 5,
    paddingTop: 5,
    paddingBottom: 10
  },
  containerFecha: {
    flexGrow: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",

    paddingTop: 0,
    paddingBottom: 0,
    borderWidth: 0
  },
  fecha: {
    fontWeight: "normal",
    fontSize: 11,
    color: color.$textoPronostico
  },
  fecha1: {
    fontWeight: "normal",
    fontSize: 11,
    color: color.$textoPronostico,
    textAlign: "center"
  },
  fechax: {
    flex: 1,
    fontWeight: "normal",
    fontSize: 11,
    color: color.$textoPronostico,
    textAlign: "center"
  },
  containerNombreEquipos: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 0,
    paddingBottom: 0,
    borderWidth: 0
  },
  text: {
    fontWeight: "normal",
    fontSize: 16,
    color: color.$textoPronostico
  },
  text1: {
    fontWeight: "normal",
    fontSize: 16,
    color: color.$textoPronostico,
    textAlign: "center"
  },
  textx: {
    flex: 1,
    fontWeight: "normal",
    fontSize: 16,
    color: color.$textoPronostico,
    textAlign: "center"
  },
  text2: {
    fontWeight: "normal",
    fontSize: 16,
    color: color.$textoPronostico,
    textAlign: "center"
  },
  containerBanderasMarcadores: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    borderWidth: 0
  },
  containerBanderasMarcadores1: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",

    borderWidth: 0
  },
  containerImageA: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 0
  },

  containerApuesta: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 0
  },
  containerImageB: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 0
  },
  containerMarcador: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 0
  },

  containerMarcadorY: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",

    borderWidth: 0
  },

  containerMarcador1: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 0
  },
  image: {
    borderRadius: 5,
    height: undefined,
    resizeMode: "contain",
    aspectRatio: 70 / 46,
    width: 45
  },
  marcador: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: color.$fondoBotonInput,
    color: color.$formInputBoxColor,
    fontSize: 25,

    padding: 0,
    margin: 0
  }
});
