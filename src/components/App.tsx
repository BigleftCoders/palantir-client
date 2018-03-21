import * as React from 'react';
import 'static/styles/main.css';

import AuthScreen from './AuthScreen';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <AuthScreen />
      </div>
    );
  }
}

export default App;
