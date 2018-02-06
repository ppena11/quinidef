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
    fontSize: 26,
    fontWeight: '500',
    color: '$white',
    textAlign: 'center',
  },
  centro: {
    flex: 8,
    backgroundColor: '$primaryBackground',
    borderRadius: 25,
    marginVertical: 10,
  },
});
