import EStyleSheet from 'react-native-extended-stylesheet';
import color from '../../comun/colors';

export default EStyleSheet.create({
  container: {
    margin: 10,
    width: '15%',
    borderColor: color.$inputContainerBorderColor,
    borderBottomWidth: 3,
  },
  input: {
    paddingRight: 5,
    paddingLeft: 5,
    color: color.$inputColor,
    fontSize: 25,
    fontWeight: '700',
    width: '100%',
  },
});