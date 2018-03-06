import React, { Component } from 'react';
import { View, BackHandler } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { connect } from 'react-redux';
import firebase from 'firebase';

import { Container } from '../components/Container';
import { Spinner } from '../components/Spinner';

class CargandoInicio extends Component {
  static navigationOptions = {
    header: null,
  };

  componentDidMount() {
    const { navigate } = this.props.navigation;
    //BackHandler.addEventListener('hardwareBackPress', () => this.props.navigation.goBack());

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        navigate('TusQuinielas');
      } else {
        navigate('Login');
      }
    });
  }
 
  render() {
    return (
      <Container>
        <View style={styles.spinnerStyle}>
          <Spinner size="large" />
        </View>
      </Container>
    );
  }
}

const styles = EStyleSheet.create({
  spinnerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
});

const mapStateToProps = (state) => ({
  error: state.auth.error,
});

export default connect(mapStateToProps, {})(CargandoInicio);