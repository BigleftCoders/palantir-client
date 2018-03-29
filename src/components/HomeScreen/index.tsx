import * as React from 'react';
import styled from 'types/styled-components';
import { RouteComponentProps } from 'react-router';
import { connect } from 'react-redux';
import { Button, Layout } from 'antd';

// store
import { logout } from 'store/Auth/actions';

interface IProps extends RouteComponentProps<any> {
  logout: () => Promise<any>;
}

class HomeScreen extends React.Component<IProps> {
  handleLogout = async () => {
    const { logout, history } = this.props;
    await logout();
    history.push('/login');
  };

  render() {
    return (
      <Layout>
        <p>home screen</p>
        <Button onClick={this.handleLogout}>Logout</Button>
      </Layout>
    );
  }
}

export default connect<any, any, any>(null, { logout })(HomeScreen);
