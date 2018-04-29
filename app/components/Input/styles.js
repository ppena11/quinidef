import EStyleSheet from 'react-native-extended-stylesheet';
import color from '../../comun/colors';

export default EStyleSheet.create({
  container: {
    marginTop: 10,
    width: '100%',
    borderColor: color.$inputContainerBorderColor,
    borderBottomWidth: 2,
  },
  label: {
    padding: 5,
    paddingBottom: 0,
    color: color.$inputLabelColor,
    fontSize: 17,
    fontWeight: '700',
    width: '100%',
  },
  input: {
    paddingRight: 5,
    paddingLeft: 5,
    color: color.$inputColor,
    fontSize: 18,
    fontWeight: '700',
    width: '100%',
  },
});
