import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from 'redux-logger';
import { persistStore } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './rootReducer';
import rootSaga from './rootSagas';

const sagaMiddleware = createSagaMiddleware();
const middlewares = [logger, sagaMiddleware];

const composeEnhancers = composeWithDevTools(applyMiddleware(...middlewares));

export const store = createStore(rootReducer, composeEnhancers);

export const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);
