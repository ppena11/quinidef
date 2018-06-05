// import { Text, View } from "react-native";
// import React, { Component } from "react";
// import { connect } from "react-redux";

// import RootNavigatort from "../config/routest";
// import color from "../comun/colors";

// const App = ({ dispatch, nav }) => <RootNavigatort />;

// const mapStateToProps = state => ({
//   nav1: state.nav1
// });

// const AppWithNavigation = connect(mapStateToProps)(App);

// export default class extends Component {
//   static navigationOptions = ({ navigation }) => {
//     const { params } = navigation.state;

//     return {
//       // title: params
//       //   ? `${params.quiniela.nombreapuesta} - ${
//       //       params.quiniela.quinielaNombre
//       //     } - ${params.quiniela.puntos} PTS`
//       //   : "A Nested Details Screen",
//       // headerStyle: {
//       //   backgroundColor: color.$primaryBackground,
//       // },
//       // headerTintColor: color.$headerImageTintColor,
//       // headerTitleStyle: {
//       //   fontWeight: "bold"
//       // }
//     };
//   };

//   render() {
//     //console.log(this.props.navigation);
//     return (
//       <AppWithNavigation
//         screenProps={{ rootNavigation: this.props.navigation }}
//       />
//     );
//   }
// }
