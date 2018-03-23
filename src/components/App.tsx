import * as React from 'react';
import 'styles/main.css';
import { BrowserRouter, Route } from 'react-router-dom';

import AuthScreen from './AuthScreen';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Route path="/" component={AuthScreen} />
      </BrowserRouter>
    );
  }
}

export default App;
