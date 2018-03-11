import * as React from "react";
import { StackNavigator } from "react-navigation";
import LoginScreen from "src/components/LoginScreen/LoginScreen";

const RootStack = StackNavigator({
  Home: {
    screen: LoginScreen
  }
});

export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}
