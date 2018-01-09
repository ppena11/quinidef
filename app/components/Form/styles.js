import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  inputBox: {
    flex: 8,
    backgroundColor: '$fondoBotonInput',
    borderRadius: 25,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '$white',
    marginVertical: 10,
  },
  button: {
    flex: 8,
    backgroundColor: '$fondoBotonPrincipal',
    borderRadius: 25,
    marginVertical: 10,
    paddingVertical: 13,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '$white',
    textAlign: 'center',
  },
});
