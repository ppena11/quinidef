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
    fontSize: 20,
    fontWeight: '200',
    color: color.$tituloTextColor,
    textAlign: 'center',
  },
  centro: {
    flex: 8,
    backgroundColor: color.$primaryBackground,
    borderRadius: 25,
  },
});
