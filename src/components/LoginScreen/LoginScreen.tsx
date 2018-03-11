import React from "react";
import { View, Text } from "react-native";
import { StackNavigator } from "react-navigation";

class LoginScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Login Screen</Text>
      </View>
    );
  }
}

export default StackNavigator({
  Login: {
    screen: LoginScreen
  }
});
