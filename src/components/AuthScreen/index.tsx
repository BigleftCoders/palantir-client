import * as React from 'react';
import styled from 'types/styled-components';
import { RouteComponentProps } from 'react-router';
import { connect } from 'react-redux';
import { Button } from 'antd';

// components
import LoadingSpinner from 'components/common/LoadingSpinner';

// types
import { IGlobalStore } from 'store/types';

interface IProps extends RouteComponentProps<any> {
  isDoingCallback: boolean;
}

class AuthScreen extends React.Component<IProps, any> {
  handleGoogleAuth = () => {
    window.open(
      `${process.env.REACT_APP_API_URL}/auth/google`,
      '_self',
      'height=400,width=400,fullscreen=no'
    );
  };

  render() {
    const { isDoingCallback } = this.props;

    return (
      <STWrapper>
        <LoadingSpinner isLoading={isDoingCallback} spinnerSize="large">
          <div>
            <STGreet>Hello</STGreet>
            <Button
              onClick={this.handleGoogleAuth}
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

const mapStateToProps = ({ auth }: IGlobalStore) => ({
  isDoingCallback: auth.isDoingCallback
});

export default connect<any, any, any>(mapStateToProps, null)(AuthScreen);
