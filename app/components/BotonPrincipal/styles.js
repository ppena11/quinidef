import EStyleSheet from 'react-native-extended-stylesheet';

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
    color: '$white',
    textAlign: 'center',
  },
  button: {
    flex: 8,
    backgroundColor: '$fondoBotonPrincipal',
    borderRadius: 25,
    // marginVertical: 10,
    paddingVertical: 10,
  },
});
