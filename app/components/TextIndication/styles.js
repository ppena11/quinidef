import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
  container: {
    flexGrow: 1,
    marginTop: 10,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',

    flexDirection: 'row',
  },
  label: {
    width: '80%',
    paddingBottom: 0,
    color: '$white',
    fontSize: 17,
    fontWeight: '700',
    textAlign: 'center',
  },
});
