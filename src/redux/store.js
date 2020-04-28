import { createStore, applyMiddleware } from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import rootReducers from './rootReducers';

const middlewares = [];

const composeEnhancers = composeWithDevTools(
  applyMiddleware(...middlewares)
)

export const store = createStore(rootReducers, composeEnhancers);
