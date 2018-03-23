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
  doGoogleAuthCallback: () => any;
  openGoogleAuthWindow: () => any;
}

interface IProps extends RouteComponentProps<any> {
  auth: any;
  authActions: IAuthActions;
}

class AuthScreen extends React.Component<IProps> {
  handleGoogleAuth = () => {
    this.props.authActions.openGoogleAuthWindow();
  };

  componentDidMount() {
    const parsedCodeObj = queryString.parseUrl(this.props.location.search);
    const code = parsedCodeObj.query.code;
    console.log(code);

    if (code) {
      this.props.authActions.doGoogleAuthCallback();
    }
  }

  render() {
    const { isAuthInProcess, isWaitForAuthCallback } = this.props.auth;

    return (
      <STWrapper>
        <LoadingSpinner isLoading={isWaitForAuthCallback} spinnerSize="large">
          <div>
            <STGreet>Hello</STGreet>
            <Button
              onClick={this.handleGoogleAuth}
              loading={isAuthInProcess}
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

export default connect<any, any, any>(mapStateToProps, mapDispatchToProps)(AuthScreen);
