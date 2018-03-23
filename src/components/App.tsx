import * as React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

// styles
import 'styles/main.css';

// components
import AuthScreen from './AuthScreen';

// store
import configureStore from 'store';

const store = configureStore();

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Route path="/" component={AuthScreen} />
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
