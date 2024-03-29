import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import * as action from './events.actions';
import type { RootState } from '../store';
import { Events, EventGroups, EventGroup } from '@src/models';
import { sortEvents } from './events.api';

export interface EventsState {
  eventGroups: EventGroups;
  completedEvents: Events;
  events: Events;
  status: 'idle' | 'pending' | 'succeeded' | 'failed';
  error: string;
}

const initialState: EventsState = {
  eventGroups: [],
  completedEvents: [],
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
      .addCase(action.loadEventGroups.fulfilled, (state, action: PayloadAction<EventGroups>) => {
        state.eventGroups = action.payload;
        state.status = 'succeeded';
      })
      .addCase(action.loadEventGroups.pending, state => {
        state.status = 'pending';
      })
      .addCase(action.loadEventGroups.rejected, state => {
        state.status = 'failed';
      })
      .addCase(action.createEventGroup.fulfilled, (state, action: PayloadAction<EventGroup>) => {
        const eventGroups = [...state.eventGroups, action.payload];
        state.eventGroups = eventGroups;
        state.status = 'succeeded';
      })
      .addCase(action.createEventGroup.pending, state => {
        state.status = 'pending';
      })
      .addCase(action.createEventGroup.rejected, state => {
        state.status = 'failed';
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
      .addCase(action.updateEventsGroup.pending, state => {
        state.status = 'pending';
      })
      .addCase(action.updateEventsGroup.rejected, state => {
        state.status = 'failed';
      })
      .addCase(action.updateEvent.fulfilled, (state, action: PayloadAction<any>) => {
        const { key, data } = action.payload;
        const event = state.events.find(e => e.key === key);
        const updatedEvent = { ...event, ...data };
        const events = state.events.map(e => (e.key === key ? updatedEvent : e)) as Events;
        state.events = sortEvents(events);
        state.status = 'succeeded';
      })
      .addCase(action.updateEvent.pending, state => {
        state.status = 'pending';
      })
      .addCase(action.updateEvent.rejected, state => {
        state.status = 'failed';
      })
      .addCase(action.completeEvent.fulfilled, (state, action: PayloadAction<any>) => {
        const { group, date } = action.payload;
        const eventGroup = state.eventGroups.find(e => e.key === group);
        if (eventGroup) {
          eventGroup.completedEvents = [...eventGroup.completedEvents, date];
        }
        state.status = 'succeeded';
      })
      .addCase(action.completeEvent.pending, state => {
        state.status = 'pending';
      })
      .addCase(action.completeEvent.rejected, state => {
        state.status = 'failed';
      })
      .addCase(action.deleteEvent.fulfilled, state => {
        state.status = 'succeeded';
      })
      .addCase(action.deleteEvent.pending, state => {
        state.status = 'pending';
      })
      .addCase(action.deleteEvent.rejected, state => {
        state.status = 'failed';
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
