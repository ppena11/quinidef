import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: '500',
    color: '$white',
    textAlign: 'center',
  },
  centro: {
    flex: 1,
    backgroundColor: '$primaryBackground',
    borderRadius: 25,
    marginVertical: 10,
  },
});
