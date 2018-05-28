import EStyleSheet from 'react-native-extended-stylesheet';
import color from '../../comun/colors';

export default EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.$primaryBackground,
    flexDirection: 'column',
    justifyContent: "center",
  },
});
