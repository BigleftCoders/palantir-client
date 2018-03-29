import * as React from 'react';
import styled from 'types/styled-components';
import { RouteComponentProps } from 'react-router';
import { connect } from 'react-redux';
// import { Button } from 'antd';

// components
import AppHeader from 'components/AppHeader';

// store
import { logout } from 'store/Auth/actions';

interface IProps extends RouteComponentProps<any> {}

class HomeScreen extends React.Component<IProps, any> {
  render() {
    return (
      <STAppWrapper>
        <AppHeader />
        <p>home screen</p>
      </STAppWrapper>
    );
  }
}

const STAppWrapper = styled.div`
  width: 1000px;
  margin: 0 auto;
`;

// пока просто подрублен к стору, но ничего из него не берет
export default connect<any, any, any>(null, null)(HomeScreen);
