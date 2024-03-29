import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import rootReducer from '.';

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      thunk: true,
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type StoreType = typeof store;

export default store;
