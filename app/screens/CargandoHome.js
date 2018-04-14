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
    // BackHandler.addEventListener('hardwareBackPress', () => this.props.navigation.goBack());

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        //    console.log('WEPA');

        navigate('TusQuinielas');
      } else {
        navigate('Login');
        //   console.log('BYEEEEEE');
      }
    });
  }

  render() {
    return (
      <Container>
        <View style={styles.viewImgStyle}>
          <Image style={styles.imgStyle} source={require('../components/Logo/images/copa1.png')} />
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
