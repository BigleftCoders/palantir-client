import React from 'react';
import { StackNavigator } from 'react-navigation';
import styled from '../../interfaces/styled-components';

const StyledView = styled.View`
  flex: 1;
  background-color: #fff;
  align-items: center;
  justify-content: center;
`;

const StyledText = styled.Text`
  color: gray;
  text-align: center;
`;

class HomeScreen extends React.Component {
  render() {
    return (
      <StyledView>
        <StyledText>Home Screen</StyledText>
      </StyledView>
    );
  }
}

export default StackNavigator({
  Home: {
    screen: HomeScreen
  }
});
