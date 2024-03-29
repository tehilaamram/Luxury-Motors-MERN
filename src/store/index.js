import { applyMiddleware, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import rootReducer from '../reducers';

let store = createStore(rootReducer, applyMiddleware(createLogger({ collapsed: true })));

export default store;
