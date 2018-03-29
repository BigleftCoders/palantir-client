import * as React from 'react';
import { Switch, Route } from 'react-router';

// Routes
import AuthScreen from 'components/AuthScreen';
import HomeScreen from 'components/HomeScreen';
import Room from 'components/Room';

class Routes extends React.Component {
  render() {
    return (
      <Switch>
        <Route path="/" exact component={HomeScreen} />
        <Route path="/login" component={AuthScreen} />
        <Route path="/room:id" component={Room} />
      </Switch>
    );
  }
}

export default Routes;
