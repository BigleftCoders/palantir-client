import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/rootReducer';

export default function configureStore(initialState?: object) {
  const devtools: any = window['devToolsExtension'] ? window['devToolsExtension']() : (f: any) => f;

  return createStore(rootReducer, initialState, compose(applyMiddleware(thunk), devtools));
}
