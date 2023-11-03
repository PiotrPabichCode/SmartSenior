import { combineReducers } from 'redux';
import eventsReducer from './events/events.slice';
import authReducer from './auth/auth.slice';

const rootReducer = combineReducers({
  auth: authReducer,
  events: eventsReducer,
});

export default rootReducer;
