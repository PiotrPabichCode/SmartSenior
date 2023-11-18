import { createAsyncThunk } from '@reduxjs/toolkit';
import * as api from './events.api';
import { Event, Images } from '@src/models';

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

export const createEvent = createAsyncThunk(
  'events/createEvent',
  async (data: Event, { rejectWithValue }) => {
    try {
      return await api.createEvent(data);
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

export const updateEvent = createAsyncThunk(
  'events/updateEvent',
  async ({ eventKey, data }: { eventKey: string; data: Partial<Event> }, { rejectWithValue }) => {
    try {
      return await api.updateEvent(eventKey, data);
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const deleteEvent = createAsyncThunk(
  'events/deleteEvent',
  async (key: string, { rejectWithValue }) => {
    try {
      await api.deleteEvent(key);
      return key;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
