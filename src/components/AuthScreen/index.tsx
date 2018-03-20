import * as React from 'react';
// import { AuthProps } from './types';
import { Button } from 'antd';
import styled from 'styled-components';
import axios from 'api/rest';

const STButton = styled(Button)`
  width: 300px;
  height: 20px;
`;

class AuthScreen extends React.Component {
  state = {};

  authMe = async () => {
    try {
      const фишечка = await axios.get('/auth/google');
      console.log(фишечка);
    } catch (error) {
      throw error;
    }
  };

  render() {
    return (
      <div>
        Hello kekus
        <STButton onClick={() => this.authMe()} type="primary">
          KEK
        </STButton>
      </div>
    );
  }
}

export default AuthScreen;
