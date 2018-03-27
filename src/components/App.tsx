import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router';
import { getProfile } from 'store/Auth/actions';
import Auth from 'api/auth';
// styles
import 'styles/main.css';

import Routes from './routes';

// store
import { IUserData } from 'store/Auth/types';

interface IProps extends RouteComponentProps<any> {
  getProfile: () => Promise<IUserData>;
}
class App extends React.Component<IProps> {
  async componentDidMount() {
    const { getProfile, history } = this.props;
    try {
      const profile = await getProfile();
      console.log(profile);
      if (profile) {
        history.push('/');
      } else {
        history.push('/login');
      }
    } catch (error) {
      history.push('/login');
      throw error;
    }
  }
  render() {
    return (
      <div>
        <Routes />
        <button onClick={() => Auth.logout()}>Logout</button>
      </div>
    );
  }
}

export default withRouter(connect<any, any, any>(null, { getProfile })(App));
