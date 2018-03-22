import * as React from 'react';
// import { AuthProps } from './types';
import { Button } from 'antd';
import styled from 'styled-components';
import { RouteComponentProps } from 'react-router';
// api
// import auth from 'api/auth';
import * as queryString from 'query-string';
import axios from 'api/rest';

interface IProps extends RouteComponentProps<any> {}

class AuthScreen extends React.Component<IProps> {
  state = {};

  handleGoogleAuth = async () => {
    try {
      window.open(
        'http://localhost:5000/auth/google',
        '_blank',
        'height=400,width=400,fullscreen=no'
      );
    } catch (error) {
      throw error;
    }
  };
  async componentDidMount() {
    try {
      const parsedCodeObj = queryString.parseUrl(this.props.location.search);
      const code = parsedCodeObj.query.code;
      if (code) {
        const res = await axios.get('/auth/google/callback', {
          params: {
            code
          }
        });
        console.log(res);
      }
    } catch (error) {
      throw error;
    }
  }
  render() {
    return (
      <STWrapper>
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

export default AuthScreen;
