import EStyleSheet from 'react-native-extended-stylesheet';
import color from '../../comun/colors';

export default EStyleSheet.create({
  container: {
    flexGrow: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'flex-start',
    flexDirection: 'row',
  },
  label: {
    width: '90%',
    paddingBottom: 0,
    color: color.$textIndicationLabelColor,
    fontSize: 17,
    fontWeight: '700',
    textAlign: 'center',
  },
});
