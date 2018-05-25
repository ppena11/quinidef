import React, { Component } from 'react';
import { View, BackHandler, Image } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { connect } from 'react-redux';
import firebase from 'firebase';
import { NavigationActions } from "react-navigation";

import { Container } from '../components/Container';
import { Spinner } from '../components/Spinner';
import { buscarQuinielas, buscarQuinielasAdministradas } from '../actions';

class CargandoHome extends Component {
  static navigationOptions = {
    header: null,
  };

  componentDidMount() {
    const { navigate } = this.props.navigation;
    console.log("(CargandoHome) componentDidMount")
    BackHandler.addEventListener('hardwareBackPress', () => {return true});

    firebase.auth().onAuthStateChanged((user) => {
      let pantallaInicio;
      if(user) {
        // navigate('TusQuinielas');
        pantallaInicio = 'TusQuinielas';
      }
      else {
        // navigate('Login');
        pantallaInicio = 'Login';
      }

      const resetAction = NavigationActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({ routeName: pantallaInicio })
        ]
      });
      this.props.navigation.dispatch(resetAction);
    });
  }

  componentWillUnmount() {
    console.log("(CargandoHome) componentWillUnmount")
    BackHandler.removeEventListener('hardwareBackPress', () => {return true});
  }  

  render() {
    return (
      <Container>
        <View style={styles.viewImgStyle}>
          <Image style={styles.imgStyle} source={require('../images/logo.png')} />
        </View>
        <View style={styles.viewStyle}>
          <Spinner size="large" />
        </View>
        <View style={styles.viewStyle} />
      </Container>
    );
  }
}

const styles = EStyleSheet.create({
  viewImgStyle: {
    flex: 3,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgStyle: {
    height: 250,
    width: 250,
  },
  viewStyle: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const mapStateToProps = state => ({
  error: state.auth.error,
});

export default connect(mapStateToProps, { buscarQuinielas })(CargandoHome);
