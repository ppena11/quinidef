import EStyleSheet from 'react-native-extended-stylesheet';
import { Dimensions } from 'react-native';
import color from '../../comun/colors';

const imageWidth = Dimensions.get('window').width / 1.75;
const imageHeight = Dimensions.get('window').height / 5;

export default EStyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerImage: {
    alignItems: 'center',
    justifyContent: 'center',
    width: imageWidth,
    height: imageHeight,
  },
  text: {
    fontWeight: '600',
    fontSize: 18,
    letterSpacing: -0.5,
    marginTop: 15,
    color: color.$logoTextColor,
  },
});
