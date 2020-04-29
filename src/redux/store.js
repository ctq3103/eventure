import { createStore, applyMiddleware } from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import rootReducer from './rootReducer';

const middlewares = [];

const composeEnhancers = composeWithDevTools(
  applyMiddleware(...middlewares)
)

export const store = createStore(rootReducer, composeEnhancers);
