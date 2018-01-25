import React, { Component } from 'react';
import { StatusBar, ListView, View, ScrollView } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { connect } from 'react-redux';

import { Container } from '../components/Container';

import { BotonPrincipal } from '../components/BotonPrincipal';
import { Titulo } from '../components/Titulo';

import { Qx } from '../components/Qx';

import color from '../comun/colors';

class TusQuinielas extends Component {
  static navigationOptions = {
    header: null,
  };

  componentWillMount() {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    });
    console.log(this.props.quinielas);
    this.dataSource = ds.cloneWithRows(this.props.quinielas);
  }

  test() {
    console.log('TEST');
  }

  renderRow(quiniela) {
    return <Qx quiniela={quiniela} />;
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <Container>
        <StatusBar translucent={false} barStyle="light-content" backgroundColor={color.$statusBarBackgroundColor} />
        <View style={styles.form}>
          <View style={styles.titulo}>
            <Titulo>MIS QUINIELAS</Titulo>
          </View>

          <ScrollView style={styles.cuerpo}>
            <ListView dataSource={this.dataSource} renderRow={this.renderRow} />
          </ScrollView>

          <View style={styles.bottom}>
            <BotonPrincipal onPress={() => this.test()}>Unirse a una Quiniela</BotonPrincipal>
            <BotonPrincipal onPress={() => this.test()}>Crea tu Quiniela</BotonPrincipal>
          </View>
        </View>
      </Container>
    );
  }
}

const styles = EStyleSheet.create({
  form: {
    flex: 1,

    justifyContent: 'space-between',
    flexDirection: 'column',
  },
  titulo: {
    padding: 20,
  },
  cuerpo: {
    flex: 1,
  },
  bottom: {
    padding: 20,
  },
});

const mapStateToProps = state => ({
  error: state.auth.error,
  quinielas: state.quinielas.quinielas,
});

export default connect(mapStateToProps, {})(TusQuinielas);
