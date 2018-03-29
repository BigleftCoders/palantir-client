import * as React from 'react';
import styled from 'types/styled-components';
import { withRouter, RouteComponentProps } from 'react-router';
import { connect } from 'react-redux';
import { Icon, Menu, Dropdown } from 'antd';

// store
import { logout } from 'store/Auth/actions';
import { IUserData } from 'store/Auth/types';

interface IProps extends RouteComponentProps<any> {
  userData: IUserData;
  logout: () => Promise<any>;
}

class AppHeader extends React.Component<IProps, any> {
  onLogout = async () => {
    const { logout, history } = this.props;
    await logout();
    history.push('/login');
  };

  handleMenuItemClick = ({ key }: any) => {
    if (key === 'logout') {
      this.onLogout();
    }
  };

  renderDropdown = () => {
    return (
      <Menu onClick={this.handleMenuItemClick}>
        <Menu.Item key="settings">Settings</Menu.Item>
        <Menu.Divider />
        <Menu.Item key="logout">Logout</Menu.Item>
      </Menu>
    );
  };

  get userName(): string {
    const { displayName } = this.props.userData;

    return (displayName || '').split(' ')[0];
  }

  render() {
    const userName = this.userName;

    return (
      <STHeaderWrap>
        <STLogo>Palantir</STLogo>
        <STOptionsSection>
          <STUserName>{userName}</STUserName>
          <STOptionsIcon>
            <Dropdown overlay={this.renderDropdown()} placement="bottomRight" trigger={['click']}>
              <Icon type="setting" />
            </Dropdown>
          </STOptionsIcon>
        </STOptionsSection>
      </STHeaderWrap>
    );
  }
}

const STHeaderWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 48px;
  margin-bottom: 15px;
  border-bottom: 1px solid #64b5f6;
`;

const STLogo = styled.div`
  font-size: 18px;
  font-weight: 600;
`;

const STOptionsSection = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const STUserName = styled.div`
  margin-right: 10px;
  font-size: 16px;
  font-weight: 500;
  cursor: default;
`;

const STOptionsIcon = styled.div`
  font-size: 24px;
  cursor: pointer;
`;

const mapStateToProps = (state: any) => ({
  userData: state.auth.userData
});

export default withRouter(connect<any, any, any>(mapStateToProps, { logout })(AppHeader));
