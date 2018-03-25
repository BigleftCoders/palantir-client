import * as React from 'react';
// tslint:disable-next-line
import styled from 'styled-components';
import { RouteComponentProps } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button } from 'antd';

// api
import * as queryString from 'query-string';

// actions
import * as authActions from 'store/actions/authActions';

// components
import LoadingSpinner from 'components/common/LoadingSpinner';

// types
// import { AuthProps } from './types';

interface IAuthActions {
  doGoogleAuthCallback: (code: string) => void;
  openGoogleAuthWindow: () => void;
}
interface IProps extends RouteComponentProps<any> {
  auth: any;
  authActions: IAuthActions;
}
interface IState {
  isLoading: boolean;
}

class AuthScreen extends React.Component<IProps, IState> {
  state: IState = {
    isLoading: false
  };

  handleGoogleAuth = () => {
    // this.props.authActions.openGoogleAuthWindow();
    window.open(
      `${process.env.REACT_APP_API_URL}/auth/google`,
      '_self',
      'height=400,width=400,fullscreen=no'
    );
  };

  componentDidMount() {
    const parsedCodeObj = queryString.parseUrl(this.props.location.search);
    const code = parsedCodeObj.query.code;
    console.log(code);

    if (code) {
      this.props.authActions.doGoogleAuthCallback(code);
    }
  }

  render() {
    // const { isAuthInProcess, isWaitForAuthCallback } = this.props.auth;

    return (
      <STWrapper>
        <LoadingSpinner isLoading={this.state.isLoading} spinnerSize="large">
          <div>
            <STGreet>Hello</STGreet>
            <Button
              onClick={this.handleGoogleAuth}
              loading={this.state.isLoading}
              type="primary"
              icon="google-plus"
              size="large"
            >
              Sign in with Google
            </Button>
          </div>
        </LoadingSpinner>
      </STWrapper>
    );
  }
}

function mapStateToProps(state: any) {
  return {
    auth: state.auth
  };
}

function mapDispatchToProps(dispatch: any) {
  return {
    authActions: bindActionCreators(authActions, dispatch)
  };
}

const STGreet = styled.p`
  margin-bottom: 10px;
  font-family: Roboto, sans-serif;
  font-size: 32px;
  text-align: center;
  color: #000;
`;

const STWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

export default connect<any, any, any>(mapStateToProps, mapDispatchToProps)(
  AuthScreen
);
