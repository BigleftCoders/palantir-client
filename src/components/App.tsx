import * as React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

// styles
import 'styles/main.css';

// components
import AuthScreen from './AuthScreen';
import Room from './Room';

// store
import configureStore from 'store/configureStore';

const store = configureStore();

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Switch>
            <Route path="/" component={AuthScreen} />
            <Route path="/room" component={Room} />
          </Switch>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
