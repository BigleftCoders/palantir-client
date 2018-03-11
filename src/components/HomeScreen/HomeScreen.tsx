import React from 'react';
import { StackNavigator } from 'react-navigation';
import styled from '../../interfaces/styled-components';

// components
import AuthButton from './AuthButton';

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Home'
  };

  render() {
    return (
      <HomeView>
        <HomeGreetings>Home Screen</HomeGreetings>
        <AuthButton />
      </HomeView>
    );
  }
}

export default HomeScreen;

const HomeView = styled.View`
  flex: 1;
  background-color: #fff;
  align-items: center;
  justify-content: center;
`;

const HomeGreetings = styled.Text`
  color: gray;
  text-align: center;
  padding-bottom: 10px;
`;
