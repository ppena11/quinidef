import React, { Component } from 'react';
import { Text, View, Image, Switch } from 'react-native';
import { withNavigation } from 'react-navigation';

import { Card } from '../Card';
import { CardSection } from '../CardSection';
import { Buttonb } from '../Buttonb';
import color from '../../comun/colors';

class QuinielaAdminItem extends Component {
  onRowPress() {
    this.props.navigation.navigate('DetalleQuinielaAdministrada', {
      quiniela: this.props.quiniela,
    });
  }

  pressed(e) {
    console.log(e);
  }

  render() {
    const { Name, Status } = this.props.quiniela;
    const {
      headerContentStyle,
      headerTextStyle,
      headerTextStyle2,
      thumbnailStyle,
      thumbnailContainerStyle,
      switchStyle,
    } = styles;

    return (
      <Card>
        <CardSection>
          <View style={thumbnailContainerStyle}>
            <Image style={thumbnailStyle} source={require('../Logo/images/copa1.png')} />
          </View>
          <View style={headerContentStyle}>
            <Text style={headerTextStyle}>{Name}</Text>
            <Switch
              style={switchStyle}
              onValueChange={value => this.setState({ toggled: value })}
              value={Status}
            />
          </View>
        </CardSection>
      </Card>
    );
  }
}

const styles = {
  headerContentStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTextStyle: {
    fontSize: 18,
    color: color.$qxaHeaderTextStyle,
    justifyContent: 'center',
    alignItems: 'center',
  },
  switchStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 10,
  },
  headerTextStyle2: {
    fontSize: 12,
    color: color.$qxaHeaderTextStyle2,
  },
  thumbnailStyle: {
    height: 50,
    width: 50,
  },
  thumbnailContainerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 10,
  },
};

export default withNavigation(QuinielaAdminItem);
