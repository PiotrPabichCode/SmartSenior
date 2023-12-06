import { createAsyncThunk } from '@reduxjs/toolkit';
import { Medicine, Note } from '@src/models';
import * as api from './notes.api';

export const addNote = createAsyncThunk(
  'notes/addNote',
  async (note: Note, { rejectWithValue }) => {
    try {
      return await api.addNote(note);
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const updateNote = createAsyncThunk(
  'notes/updateNote',
  async ({ key, data }: { key: string; data: Partial<Note> }, { rejectWithValue }) => {
    try {
      return await api.updateNote(key, data);
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const deleteNote = createAsyncThunk(
  'notes/deleteNote',
  async (key: string, { rejectWithValue }) => {
    try {
      return await api.deleteNote(key);
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const loadNotes = createAsyncThunk('notes/loadNotes', async (_, { rejectWithValue }) => {
  try {
    return await api.loadNotes();
  } catch (error) {
    return rejectWithValue(error);
  }
});
