import * as React from 'react';
import styled from 'types/styled-components';
import { withRouter, RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Icon, Menu, Dropdown } from 'antd';

// store
import { logout } from 'store/Auth/actions';

// types
import { IUserData } from 'store/Auth/types';
import { IGlobalStore } from 'store/types';

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
        <Menu.Item key="settings">
          <STOptionTitle>Settings</STOptionTitle>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="logout">
          <STOptionTitle>Logout</STOptionTitle>
        </Menu.Item>
      </Menu>
    );
  };

  get userName(): string {
    const { displayName } = this.props.userData;

    return (displayName || '').split(' ')[0];
  }

  render() {
    const dropdownList = this.renderDropdown();

    return (
      <STHeaderWrap>
        <STLogo>
          <Link to="/">Palantir</Link>
        </STLogo>
        <STOptionsSection>
          <STUserName>{this.userName}</STUserName>
          <STOptionsIcon>
            <Dropdown
              overlay={dropdownList}
              placement="bottomRight"
              trigger={['click']}
            >
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
  margin-bottom: 25px;
  padding: 0 20px;
  color: #fff;
  background-color: #4496d8;
`;

const STLogo = styled.div`
  font-size: 18px;
  font-weight: 600;
  > a {
    font-family: 'Pacifico', sans-serif;
    font-weight: 400;
    font-size: 24px;
    color: #fff;
    text-decoration: none;
    &:hover {
      color: #b3e5fc;
    }
  }
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

const STOptionTitle = styled.div`
  font-size: 16px;
`;

const mapStateToProps = ({ auth }: IGlobalStore) => ({
  userData: auth.userData
});

export default withRouter(
  connect<any, any, any>(mapStateToProps, { logout })(AppHeader)
);
