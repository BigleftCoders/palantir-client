import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router';
import { AxiosResponse } from 'axios';

// api
import roomsApi from 'api/rooms';

// components
import Routes from './routes';

// store
import { getProfile } from 'store/Auth/actions';

// types
import { IUserData } from 'store/Auth/types';
import { IGlobalStore } from 'store/types';

// styles
import 'styles/main.css';

interface IProps extends RouteComponentProps<any> {
  isUserLoaded: boolean;
  getProfile: () => Promise<IUserData>;
}

class App extends React.Component<IProps> {
  async componentDidMount() {
    const { getProfile, history } = this.props;
    const { pathname } = history.location;

    console.log(localStorage.getItem('inviteKey'));

    try {
      const profile = await getProfile();

      if (profile && pathname === '/login') {
        history.push('/');
      }
    } catch (error) {
      history.push('/login');
    }
  }

  checkStorageForInvite = async () => {
    const inviteKey = localStorage.getItem('inviteKey');
    if (inviteKey) {
      const response: AxiosResponse<any> = await roomsApi.verifyInvite(
        inviteKey
      );
    }
  };

  parseQueryParams = async () => {
    const { isUserLoaded, location } = this.props;
    const { search } = location;

    if (search) {
      const searchParams: any = {};
      const query: any = new URLSearchParams(search);

      for (let param of query.entries()) {
        searchParams[param[0]] = param[1];
      }

      if (searchParams.invite) {
        if (!isUserLoaded) {
          localStorage.setItem('inviteKey', searchParams.invite);
          return;
        }

        const response: AxiosResponse<any> = await roomsApi.verifyInvite(
          searchParams.invite
        );
      }
    }
  };

  render() {
    return <Routes />;
  }
}

const mapStateToProps = ({ auth }: IGlobalStore) => ({
  isUserLoaded: auth.isUserLoaded
});

export default withRouter(connect<any, any, any>(null, { getProfile })(App));
