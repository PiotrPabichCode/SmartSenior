import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import * as action from './events.actions';
import type { RootState } from '../store';
import { Events, Event } from '@src/models';

export interface EventsState {
  events: Events;
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
      .addCase(action.loadEvents.fulfilled, (state, action: PayloadAction<Events>) => {
        state.status = 'succeeded';
        state.events = action.payload;
      })
      .addCase(action.createEvent.fulfilled, (state, action: PayloadAction<Event>) => {
        state.status = 'succeeded';
        state.events = [...state.events, action.payload];
      })
      .addCase(action.updateEvent.fulfilled, (state, action: PayloadAction<any>) => {
        const { key, data } = action.payload;
        const event = state.events.find(e => e.key === key);
        const updatedEvent = { ...event, ...data };
        state.events = state.events.map(e => (e.key === key ? updatedEvent : e));
        state.status = 'succeeded';
      })
      .addCase(action.deleteEvent.fulfilled, (state, action: PayloadAction<string>) => {
        const key = action.payload;
        state.events = state.events.filter(event => event.key !== key);
      });
  },
});

export const { clearEvents } = eventsSlice.actions;

export const selectEventsStore = (state: RootState) => state.events;
export const selectEvents = (state: RootState) => state.events.events;
export const selectEventByKey = (state: RootState, key: string) => {
  const events = selectEvents(state);
  return events.find(event => event.key === key);
};

export default eventsSlice.reducer;
