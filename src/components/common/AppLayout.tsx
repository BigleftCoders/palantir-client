import * as React from 'react';
import styled from 'types/styled-components';

// components
import AppHeader from 'components/AppHeader';

class AppLayout extends React.Component<any, any> {
  render() {
    const { children } = this.props;

    return (
      <STAppWrapper>
        <AppHeader />
        {children}
      </STAppWrapper>
    );
  }
}

const STAppWrapper = styled.div`
  width: 1000px;
  margin: 0 auto;
`;

export default AppLayout;
