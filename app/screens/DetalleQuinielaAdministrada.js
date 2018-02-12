import React, { Component } from 'react';
import { StatusBar, ListView, View, Switch, FlatList, ScrollView } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import _ from 'lodash';
import { connect } from 'react-redux';

import { buscarQuinielasAdministradas } from '../actions';
import { Container } from '../components/Container';
import { BotonPrincipal } from '../components/BotonPrincipal';
import { Titulo } from '../components/Titulo';
import { QuinielaAdminItem } from '../components/QuinielaAdminItem';
import color from '../comun/colors';

class TusQuinielas extends Component {
  static navigationOptions = {
    header: null,
  };

  componentWillMount() {
    // this.props.buscarQuinielasAdministradas();
    // this.createDataSource(this.props);
    // const { quinielaNombre, torneo } = this.props.quiniela;
    // console.log(_.map(this.props.navigation.state.params.quiniela.Users, (val, uid) => ({ ...val, uid })));
  }

  componentWillReceiveProps(nextProps) {
    // nextPropos are the next set of props that this componnet will receive
    // this.props is still the old set of props
    // this.createDataSource(nextProps);
  }

  createDataSource({ quinielas }) {
    // const ds = new ListView.DataSource({
    //  rowHasChanged: (r1, r2) => r1 !== r2,
    // });
    // this.dataSource = ds.cloneWithRows(quinielas);
  }

  crear(navigate) {
    // console.log('TEST');
    // navigate('CreaciondeQuiniela');
  }

  tusquinielas(goBack) {
    // console.log('TEST2');
    goBack();
  }

  renderRow(quiniela) {
    return <QuinielaAdminItem quiniela={quiniela} />;
  }

  pressed(e) {
    console.log(`E...  ${e}`);
    console.log(this.value);
  }

  render() {
    const { navigate, goBack } = this.props.navigation;
    return (
      <Container>
        <StatusBar
          translucent={false}
          barStyle="light-content"
          backgroundColor={color.$statusBarBackgroundColor}
        />
        <View style={styles.form}>
          <View style={styles.titulo}>
            <Titulo>{this.props.navigation.state.params.quiniela.quinielaNombre}</Titulo>
          </View>

          <ScrollView style={styles.cuerpo}>
            <FlatList
              data={_.map(this.props.navigation.state.params.quiniela.Users, (val, uid) => ({
                ...val,
                uid,
              }))}
              renderItem={({ item }) => this.renderRow(item)}
            />
          </ScrollView>

          <View style={styles.bottom}>
            <BotonPrincipal onPress={() => this.crear(navigate)}>Eliminar quiniela</BotonPrincipal>
            <BotonPrincipal onPress={() => this.tusquinielas(goBack)}>Tus Quinielas</BotonPrincipal>
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

const mapStateToProps = (state) => {
  const tt = _.map(state.quinielasadmin, (val, uid) => ({ ...val, uid }));

  const quinielas = _.orderBy(tt, ['quinielaNombre'], ['asc']);

  return { quinielas };
};

export default connect(mapStateToProps, { buscarQuinielasAdministradas })(TusQuinielas);
