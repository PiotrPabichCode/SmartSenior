import { combineReducers } from 'redux';
import eventsReducer from './events/events.slice';
import authReducer from './auth/auth.slice';
import chatsReducer from './chats/chats.slice';
import medicinesReducer from './medicines/medicines.slice';
import pharmaciesReducer from './pharmacies/pharmacies.slice';

const rootReducer = combineReducers({
  auth: authReducer,
  events: eventsReducer,
  chats: chatsReducer,
  medicines: medicinesReducer,
  pharmacies: pharmaciesReducer,
});

export default rootReducer;
