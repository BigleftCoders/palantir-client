import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router';

// components
import Routes from './routes';

// store
import { getProfile } from 'store/Auth/actions';

// types
import { IUserData } from 'store/Auth/types';

// styles
import 'styles/main.css';

interface IProps extends RouteComponentProps<any> {
  getProfile: () => Promise<IUserData>;
}

class App extends React.Component<IProps> {
  async componentDidMount() {
    const { getProfile, history } = this.props;
    const { pathname } = history.location;

    try {
      const profile = await getProfile();

      if (profile && pathname === '/login') {
        history.push('/');
      }
    } catch (error) {
      history.push('/login');
    }
  }

  render() {
    return <Routes />;
  }
}

export default withRouter(connect<any, any, any>(null, { getProfile })(App));
