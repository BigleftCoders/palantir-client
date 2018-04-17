import * as React from 'react';
import { Switch, Route } from 'react-router';

// Routes
import AppLayout from 'components/common/AppLayout';
import AuthScreen from 'components/AuthScreen';
import HomeScreen from 'components/HomeScreen';
import Room from 'components/Room';

class Routes extends React.Component {
  render() {
    return (
      <Switch>
        <AppRoute exact path="/" component={HomeScreen} />
        <AppRoute path="/room/:id" component={Room} />

        <Route path="/login" component={AuthScreen} />
      </Switch>
    );
  }
}

const AppRoute = ({ component, ...props }: any) => (
  <Route {...props} component={withLayout(component)} />
);

const withLayout = (Component: any) => (props: any) => (
  <AppLayout>
    <Component {...props} />
  </AppLayout>
);

export default Routes;
