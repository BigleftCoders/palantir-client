import React from 'react';
import PropTypes from 'prop-types';
import { StackNavigator } from 'react-navigation';
import { Button } from 'antd-mobile';
import styled from '../../interfaces/styled-components';

// constants
import { LOGIN } from '../../constants/Auth';

class LoginScreen extends React.Component<{ navigation: object }> {
  static propTypes = {
    navigation: PropTypes.object.isRequired
  };

  static navigationOptions = {
    title: 'Log In'
  };

  handleAuth = () => {
    const { navigation } = this.props;
    navigation.dispatch({ type: LOGIN });
  };

  render() {
    return (
      <LoginView>
        <LoginGreetings>Hello, stranger!</LoginGreetings>
        <Button type="primary" onClick={this.handleAuth}>
          Log in
        </Button>
      </LoginView>
    );
  }
}

export default LoginScreen;

const LoginView = styled.View`
  flex: 1;
  background-color: #fff;
  align-items: center;
  justify-content: center;
`;

const LoginGreetings = styled.Text`
  color: gray;
  text-align: center;
  padding-bottom: 10px;
`;
