import EStyleSheet from 'react-native-extended-stylesheet';
import color from '../../comun/colors';

export default EStyleSheet.create({
  button: {
    marginTop: 5,
    padding: 20,
    backgroundColor: color.$fondoBoton,
    borderRadius: 4,
    alignItems: 'center',
    width: '100%',
  },
  text: {
    color: color.$textoBoton,
    fontWeight: '700',
    fontSize: 18,
  },
});
