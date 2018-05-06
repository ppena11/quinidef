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
    marginLeft: 10,
    marginRight: 10,
    paddingTop: 0,
    paddingBottom: 0,
    borderWidth: 0
  },
  fecha: {
    fontWeight: "normal",
    fontSize: 14,
    color: color.$textoPronostico
  },
  containerNombreEquipos: {
    flexGrow: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginLeft: 10,
    marginRight: 10,
    paddingTop: 0,
    paddingBottom: 0,
    borderWidth: 0
  },
  text: {
    fontWeight: "normal",
    fontSize: 16,
    color: color.$textoPronostico
  },
  text2: {
    fontWeight: "normal",
    fontSize: 25,
    color: color.$textoPronostico
  },
  containerBanderasMarcadores: {
    flexGrow: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginLeft: 10,
    marginRight: 10,
    borderWidth: 0
  },
  containerImageA: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "flex-start",
    borderWidth: 0
  },
  containerImageB: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "flex-end",
    borderWidth: 0
  },
  containerMarcador: {
    flexGrow: 4,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-start",
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
    width: 40,
    height: 35,
    padding: 0,
    margin: 0
  }
});
