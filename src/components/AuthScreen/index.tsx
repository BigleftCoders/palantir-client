import * as React from 'react';
import styled from 'types/styled-components';
import * as queryString from 'query-string';
import { RouteComponentProps } from 'react-router';
import { connect } from 'react-redux';
import { Button } from 'antd';

// components
import LoadingSpinner from 'components/common/LoadingSpinner';

// store
import { doGoogleAuthCallback } from 'store/Auth/actions';

// types
import { IUserData } from 'store/Auth/types';

interface IProps extends RouteComponentProps<any> {
  doGoogleAuthCallback: (code: string) => Promise<IUserData>;
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
    const { doGoogleAuthCallback, location, history } = this.props;
    try {
      const parsedCodeObj = queryString.parseUrl(location.search);
      const code = parsedCodeObj.query.code;

      if (code) {
        this.setState({ isLoading: true });
        const profile = await doGoogleAuthCallback(code);

        if (profile) {
          history.push('/');
        }
      }
    } catch (error) {
      history.push('/login');
    }
  }

  render() {
    const { isLoading } = this.state;

    return (
      <STWrapper>
        <LoadingSpinner isLoading={isLoading} spinnerSize="large">
          <div>
            <STGreet>Hello</STGreet>
            <Button
              onClick={this.handleGoogleAuth}
              loading={isLoading}
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

export default connect<any, any, any>(null, { doGoogleAuthCallback })(
  AuthScreen
);
