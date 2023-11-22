import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import * as action from './events.actions';
import type { RootState } from '../store';
import { Events, Event, EventGroups, EventGroup } from '@src/models';
import { sortEvents } from './events.api';

export interface EventsState {
  eventGroups: EventGroups;
  events: Events;
  status: 'idle' | 'pending' | 'succeeded' | 'failed';
  error: string;
}

const initialState: EventsState = {
  eventGroups: [],
  events: [],
  status: 'idle',
  error: '',
};

export const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    clearEvents: state => {
      state.eventGroups = [];
      state.events = [];
      state.status = 'idle';
      state.error = '';
    },
  },
  extraReducers: builder => {
    builder
      .addCase(action.loadEvents.fulfilled, (state, action: PayloadAction<Events>) => {
        state.events = action.payload;
        state.status = 'succeeded';
      })
      .addCase(action.loadEventGroups.fulfilled, (state, action: PayloadAction<EventGroups>) => {
        state.eventGroups = action.payload;
        state.status = 'succeeded';
      })
      .addCase(action.createEventGroup.rejected, state => {
        state.status = 'failed';
      })
      .addCase(action.createEventGroup.pending, state => {
        state.status = 'pending';
      })
      .addCase(action.createEventGroup.fulfilled, (state, action: PayloadAction<EventGroup>) => {
        const eventGroups = [...state.eventGroups, action.payload];
        state.eventGroups = eventGroups;
        state.status = 'succeeded';
      })
      .addCase(action.updateEventsGroup.fulfilled, (state, action) => {
        const { key, data } = action.payload;
        const eventsGroup = state.eventGroups.find(e => e.key === key);
        const updatedEventsGroup = { ...eventsGroup, ...data };
        const eventGroups = state.eventGroups.map(e =>
          e.key === key ? updatedEventsGroup : e,
        ) as EventGroups;
        state.eventGroups = eventGroups;
        state.status = 'succeeded';
      })
      .addCase(action.createEvent.rejected, state => {
        state.status = 'failed';
      })
      .addCase(action.createEvent.pending, state => {
        state.status = 'pending';
      })
      .addCase(action.createEvent.fulfilled, (state, action: PayloadAction<Event>) => {
        const events = [...state.events, action.payload];
        state.events = sortEvents(events);
        state.status = 'succeeded';
      })
      .addCase(action.createRecurringEvents.rejected, state => {
        state.status = 'failed';
      })
      .addCase(action.createRecurringEvents.pending, state => {
        state.status = 'pending';
      })
      .addCase(action.createRecurringEvents.fulfilled, (state, action: PayloadAction<Events>) => {
        const events = [...state.events, ...action.payload];
        state.events = sortEvents(events);
        state.status = 'succeeded';
      })
      .addCase(action.updateEvent.fulfilled, (state, action: PayloadAction<any>) => {
        const { key, data } = action.payload;
        const event = state.events.find(e => e.key === key);
        const updatedEvent = { ...event, ...data };
        const events = state.events.map(e => (e.key === key ? updatedEvent : e)) as Events;
        state.events = sortEvents(events);
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
export const selectEventsStatus = (state: RootState) => state.events.status;

export const selectEventGroups = (state: RootState) => state.events.eventGroups;
export const selectEventsGroupByKey = (state: RootState, key: string) => {
  const eventGroups = selectEventGroups(state);
  return eventGroups.find(group => group.key === key);
};

export default eventsSlice.reducer;
