import * as React from 'react';
import styled from './src/interfaces/styled-components';

// components
import Root from './src/root';

const StyledView = styled.View`
  flex: 1;
  background-color: #fff;
  align-items: center;
  justify-content: center;
`;

export default class App extends React.Component<{}> {
  render() {
    return (
      <StyledView>
        <Root />
      </StyledView>
    );
  }
}
