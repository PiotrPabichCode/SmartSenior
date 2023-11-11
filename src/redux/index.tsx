import { combineReducers } from 'redux';
import eventsReducer from './events/events.slice';
import authReducer from './auth/auth.slice';
import chatsReducer from './chats/chats.slice';

const rootReducer = combineReducers({
  auth: authReducer,
  events: eventsReducer,
  chats: chatsReducer,
});

export default rootReducer;
