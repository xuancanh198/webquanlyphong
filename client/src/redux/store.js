import { legacy_createStore as createStore, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import rootReducer from './Reducers/indexReduceres';

const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
);

export default store;
