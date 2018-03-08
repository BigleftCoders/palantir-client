import * as React from 'react';
import { View } from 'react-native';
import styled from './interfaces/styled-components';

const StyledLogo = styled.Text`
  color: blue;
  text-align: center;
`;

const StyledTitle = styled.Text`
  color: gray;
`;

export default class Root extends React.Component<{}> {
  render() {
    console.log(styled.Text);

    return (
      <View>
        <StyledLogo>Palantir</StyledLogo>
        <StyledTitle>Root component</StyledTitle>
      </View>
    );
  }
}
