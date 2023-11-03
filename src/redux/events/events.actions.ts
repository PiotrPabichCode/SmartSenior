import { createAsyncThunk } from '@reduxjs/toolkit';
import * as api from './events.api';
import { EventDetails } from './events.types';

export const loadEvents = createAsyncThunk('events/loadEvents', async (_, { rejectWithValue }) => {
  try {
    return await api.fetchActiveEvents();
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const createEvent = createAsyncThunk(
  'events/createEvent',
  async (data: EventDetails, { rejectWithValue }) => {
    try {
      return await api.createEvent(data);
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const updateEvent = createAsyncThunk(
  'events/updateEvent',
  async (
    { eventKey, data }: { eventKey: string; data: Partial<EventDetails> },
    { rejectWithValue },
  ) => {
    try {
      return await api.updateEvent(eventKey, data);
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
