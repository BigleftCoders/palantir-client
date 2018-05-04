import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router';
import { AxiosResponse } from 'axios';
import queryString from 'query-string';

// api
import roomsApi from 'api/rooms';

// components
import Routes from './routes';

// store
import { getProfile, doGoogleAuthCallback } from 'store/Auth/actions';

// types
import { IUserData } from 'store/Auth/types';
import { IInviteResponse } from 'store/Rooms/types';

// styles
import 'styles/main.css';

interface IProps extends RouteComponentProps<any> {
  getProfile: () => Promise<IUserData>;
  doGoogleAuthCallback: (code: string) => Promise<IUserData>;
}

class App extends React.Component<IProps> {
  async componentDidMount() {
    const { doGoogleAuthCallback, getProfile, history } = this.props;
    const { pathname } = history.location;
    const { code, inviteKey: urlInviteKey } = this.parseQueryParams();
    console.log(localStorage.getItem('inviteKey'));

    if (code) {
      try {
        await doGoogleAuthCallback(code);
        const inviteKey = localStorage.getItem('inviteKey');

        if (inviteKey) {
          this.doInviteVerify(inviteKey);
          return;
        }

        history.push('/');
      } catch (error) {
        history.push('/login');
      }
    }

    try {
      const profile = await getProfile();
      const inviteKey = localStorage.getItem('inviteKey') || urlInviteKey;

      if (inviteKey) {
        this.doInviteVerify(inviteKey);
        return;
      }

      if (profile && pathname === '/login') {
        history.push('/');
      }
    } catch (error) {
      const { inviteKey } = this.parseQueryParams();

      if (inviteKey) {
        localStorage.setItem('inviteKey', inviteKey);
      }

      history.push('/login');
    }
  }

  parseQueryParams = () => {
    const { location } = this.props;
    const { search } = location;

    if (search) {
      return queryString.parse(search);
    }

    return {};
  };

  doInviteVerify = async (inviteKey: string) => {
    const { history } = this.props;
    const response: AxiosResponse<
      IInviteResponse
    > = await roomsApi.verifyInvite(inviteKey);

    localStorage.removeItem('inviteKey');
    const { roomId } = response.data;
    history.push(`/room/${roomId}`);
  };

  render() {
    return <Routes />;
  }
}

export default withRouter(
  connect<any, any, any>(null, { getProfile, doGoogleAuthCallback })(App)
);
