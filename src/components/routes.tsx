import * as React from 'react';
import { Switch, Route } from 'react-router';

// Routes
import AuthScreen from 'components/AuthScreen';
import Room from 'components/Room';

class Routes extends React.Component {
  render() {
    return (
      <Switch>
        <Route path="/" exact component={Room} />
        <Route path="/login" component={AuthScreen} />
      </Switch>
    );
  }
}

export default Routes;
