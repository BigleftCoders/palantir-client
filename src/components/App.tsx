import * as React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
// styles
import 'styles/main.css';

import Routes from './routes';

// store
import configureStore from 'store';

const store = configureStore();

class App extends React.Component {
  async componentDidMount() {
    console.log('fishka');
  }
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
