import { createAsyncThunk } from '@reduxjs/toolkit';
import * as api from './chats.api';
import { User } from '@src/models';

export const loadChats = createAsyncThunk('chats/loadChats', async (_, { rejectWithValue }) => {
  try {
    return await api.loadChats();
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const addChat = createAsyncThunk(
  'chats/addChat',
  async (user: User, { rejectWithValue }) => {
    try {
      return await api.addChat(user);
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
