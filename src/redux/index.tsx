import { combineReducers } from 'redux';
import authReducer from './reducers';

const rootReducer = combineReducers({
  auth: authReducer,
});

export default rootReducer;
