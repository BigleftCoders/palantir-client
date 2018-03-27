import * as React from 'react';
import styled from 'types/styled-components';
import { RouteComponentProps } from 'react-router';
import { connect } from 'react-redux';
import { Button } from 'antd';

// api
import * as queryString from 'query-string';

// actions
import * as authActions from 'store/auth/actions';

// components
import LoadingSpinner from 'components/common/LoadingSpinner';

// types
// import { AuthProps } from './types';

interface IProps extends RouteComponentProps<any> {
  auth: any;
  doGoogleAuthCallback: (code: string) => void;
  getProfile: () => any;
}

interface IState {
  isLoading: boolean;
}

class AuthScreen extends React.Component<IProps, IState> {
  state: IState = {
    isLoading: false
  };

  handleGoogleAuth = () => {
    window.open(
      `${process.env.REACT_APP_API_URL}/auth/google`,
      '_self',
      'height=400,width=400,fullscreen=no'
    );
  };

  async componentDidMount() {
    const { doGoogleAuthCallback, getProfile, location, history } = this.props;

    try {
      const parsedCodeObj = queryString.parseUrl(location.search);
      const code = parsedCodeObj.query.code;

      if (code) {
        await doGoogleAuthCallback(code);
      }
      const profile = await getProfile();
      if (profile) {
        history.push('/room');
      }
    } catch (error) {
      throw error;
    }
  }

  render() {
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

const mapStateToProps = (state: any) => ({
  auth: state.auth
});

export default connect<any, any, any>(mapStateToProps, authActions)(AuthScreen);
