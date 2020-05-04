import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './rootReducer';
import rootSaga from './rootSagas';

const sagaMiddleware = createSagaMiddleware();
const middlewares = [logger, sagaMiddleware];

const composeEnhancers = composeWithDevTools(applyMiddleware(...middlewares));

export const store = createStore(rootReducer, composeEnhancers);

sagaMiddleware.run(rootSaga);
