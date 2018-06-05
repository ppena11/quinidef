import React, { Component } from 'react';
import { View, BackHandler, Image } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { connect } from 'react-redux';
import firebase from 'firebase';

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
      if (user) {
        navigate('TusQuinielas');
      } else {
        navigate('Login');
      }
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
          <Image style={styles.imgStyle} source={require('../images/logoapp.png')} />
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
    height: 200,
    width: 200,
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
