import * as React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';

// components
import AppRoot from './src/root';

// utils
import rootReducer from './src/reducers/rootReducer';
import { middleware } from './src/utils/redux_utils';

// store create
const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(middleware),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);

class App extends React.Component<{}> {
  render() {
    return (
      <Provider store={store}>
        <AppRoot />
      </Provider>
    );
  }
}

export default App;
