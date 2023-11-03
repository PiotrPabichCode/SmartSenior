import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import * as action from './events.actions';
import { EventDetails } from './events.types';
import { RootState } from '../store';

export interface EventsState {
  events: EventDetails[];
  status: 'idle' | 'pending' | 'succeeded' | 'failed';
  error: string;
}

const initialState: EventsState = {
  events: [],
  status: 'idle',
  error: '',
};

export const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    clearEvents: state => {
      state.events = [];
      state.status = 'idle';
      state.error = '';
    },
  },
  extraReducers: builder => {
    builder
      .addCase(action.loadEvents.fulfilled, (state, action: PayloadAction<EventDetails[]>) => {
        state.status = 'succeeded';
        state.events = action.payload;
      })
      .addCase(action.createEvent.fulfilled, (state, action: PayloadAction<EventDetails>) => {
        state.status = 'succeeded';
        state.events = [...state.events, action.payload];
      })
      .addCase(action.updateEvent.fulfilled, (state, action: PayloadAction<any>) => {
        const { key, data } = action.payload;
        const updatedEvent = { ...state.events[key], ...data };
        state.events[key] = updatedEvent;
        state.status = 'succeeded';
      });
  },
});

export const { clearEvents } = eventsSlice.actions;

export const getEvents = (state: RootState) => state.events.events;

export default eventsSlice.reducer;
