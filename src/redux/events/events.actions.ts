import { createAsyncThunk } from '@reduxjs/toolkit';
import * as api from './events.api';
import { Event, EventGroup, Images } from '@src/models';

export const loadEvents = createAsyncThunk(
  'events/loadEvents',
  async (uid: string, { rejectWithValue }) => {
    try {
      return await api.fetchEventsByID(uid);
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const loadEventGroups = createAsyncThunk(
  'events/loadEventGroups',
  async (uid: string, { rejectWithValue }) => {
    try {
      return await api.fetchEventGroupsByID(uid);
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const createEventGroup = createAsyncThunk(
  'events/createEventGroup',
  async (event: Event, { rejectWithValue }) => {
    try {
      return await api.createEventGroup(event);
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const createEvent = createAsyncThunk(
  'events/createEvent',
  async (data: Event, { rejectWithValue }) => {
    try {
      return await api.createEvent(data, false);
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const createRecurringEvents = createAsyncThunk(
  'events/createRecurringEvents',
  async (data: Event, { rejectWithValue }) => {
    try {
      return await api.createRecurringEvents(data);
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const updateEventsGroup = createAsyncThunk(
  'events/updateEventsGroup',
  async ({ key, data }: { key: string; data: Partial<EventGroup> }, { rejectWithValue }) => {
    try {
      return await api.updateEventsGroup(key, data);
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const updateEvent = createAsyncThunk(
  'events/updateEvent',
  async (
    { group, key, data }: { group: string; key: string; data: Partial<Event> },
    { rejectWithValue },
  ) => {
    try {
      return await api.updateEvent(group, key, data);
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const deleteEvent = createAsyncThunk(
  'events/deleteEvent',
  async ({ group, key }: { group: string; key: string }, { rejectWithValue }) => {
    try {
      await api.deleteEvent(group, key);
      return key;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
