import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button } from 'antd-mobile';
import { NavigationActions } from 'react-navigation';

// constants
import { LOGOUT } from '../../constants/Auth';

interface AuthButtonProps {
  logout: any;
  loginScreen: any;
  isLoggedIn: boolean;
}

const AuthButton: React.SFC<AuthButtonProps> = ({ logout, loginScreen, isLoggedIn }) => {
  const clickHandler = isLoggedIn ? logout : loginScreen;
  const buttonTitle = isLoggedIn ? 'Log Out' : 'Open Login Screen';

  return <Button onClick={clickHandler}>{buttonTitle}</Button>;
};

AuthButton.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired,
  loginScreen: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  isLoggedIn: state.auth.isLoggedIn
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch({ type: LOGOUT }),
  loginScreen: () => dispatch(NavigationActions.navigate({ routeName: 'Login' }))
});

export default connect(mapStateToProps, mapDispatchToProps)(AuthButton);
