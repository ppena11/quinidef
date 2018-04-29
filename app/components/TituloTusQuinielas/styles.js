import EStyleSheet from 'react-native-extended-stylesheet';
import color from '../../comun/colors';

export default EStyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: '500',
    color: color.$tituloTextColor,
    textAlign: 'center',
  },
  centro: {
    flex: 1,
    backgroundColor: color.$primaryBackground,
    borderRadius: 25,
    marginVertical: 10,
  },
});
