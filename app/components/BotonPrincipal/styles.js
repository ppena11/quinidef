import EStyleSheet from 'react-native-extended-stylesheet';
import color from '../../comun/colors';

export default EStyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  lateral: {
    flex: 1,
  },
  text: {
    fontSize: 16,
    fontWeight: '500',
    color: color.$textoBotonPrincipal,
    textAlign: 'center',
  },
  button: {
    flex: 8,
    backgroundColor: color.$fondoBotonPrincipal,
    borderRadius: 25,
    marginVertical: 10,
    paddingVertical: 10,
  },
});
