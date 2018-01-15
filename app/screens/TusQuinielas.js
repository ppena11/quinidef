import React, { Component } from 'react';
import { StatusBar, ListView } from 'react-native';

import { connect } from 'react-redux';
import { Container } from '../components/Container';

import { BotonPrincipal } from '../components/BotonPrincipal';
import { Titulo } from '../components/Titulo';
import { TituloTusQuinielas } from '../components/TituloTusQuinielas';
import { QuinielaItem } from '../components/QuinielaItem';

class TusQuinielas extends Component {
  static navigationOptions = {
    header: null,
  };

  componentWillMount() {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    });
    this.DataSource = ds.cloneWithRows(this.props.quinielas);
  }

  test() {
    console.log('TEST');
  }

  renderRow(quiniela) {
    return <QuinielaItem quiniela={quiniela} />;
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <Container>
        <StatusBar translucent={false} barStyle="light-content" backgroundColor="#00244f" />
        <Titulo>MIS QUINIELAS</Titulo>
        <TituloTusQuinielas />

        <ListView dataSource={this.DataSource} renderRow={this.renderRow} />
        <BotonPrincipal onPress={() => this.test()}>Unirse a una Quiniela</BotonPrincipal>
        <BotonPrincipal onPress={() => this.test()}>Crea tu Quiniela</BotonPrincipal>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  error: state.auth.error,
  quinielas: state.quinielas.quinielas,
});

export default connect(mapStateToProps, {})(TusQuinielas);
