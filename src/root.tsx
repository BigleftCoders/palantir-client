import * as React from "react";
import styled from "styled-components";
import { View } from "react-native";
import { Button } from "antd-mobile";

const StyledLogo = styled.Text`
  color: blue;
  text-align: center;
`;

const StyledTitle = styled.Text`
  color: gray;
  padding-bottom: 10px;
  text-align: center;
`;

export default class Root extends React.Component<{}> {
  render() {
    console.log("krkd");
    return (
      <View>
        <StyledLogo>Palantir</StyledLogo>
        <StyledTitle>kek component</StyledTitle>
        <Button type="primary">awesome button</Button>
      </View>
    );
  }
}
