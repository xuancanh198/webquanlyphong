import { combineReducers } from 'redux';
import reducers from './Reducers';
import listTable from './listTable';

const rootReducer = combineReducers({
  reducers: reducers, 
  listTable: listTable 
});

export default rootReducer;
