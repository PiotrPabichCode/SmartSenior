import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import * as action from './notes.actions';
import { Note, Notes } from '@src/models';
import type { RootState } from '../store';

export interface NotesState {
  notes: Notes;
  status: 'idle' | 'pending' | 'succeeded' | 'failed';
  error: string;
}

const initialState: NotesState = {
  notes: [],
  status: 'idle',
  error: '',
};

export const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    clearNotes: state => {
      state.notes = [];
      state.status = 'idle';
      state.error = '';
    },
  },
  extraReducers: builder => {
    builder
      .addCase(action.loadNotes.fulfilled, (state, action: PayloadAction<Notes>) => {
        state.notes = action.payload;
        state.status = 'succeeded';
      })
      .addCase(action.loadNotes.pending, state => {
        state.status = 'pending';
      })
      .addCase(action.loadNotes.rejected, state => {
        state.status = 'failed';
      })
      .addCase(action.deleteNote.fulfilled, (state, action: PayloadAction<string>) => {
        state.notes = state.notes.filter(m => m.key !== action.payload);
        state.status = 'succeeded';
      })
      .addCase(action.deleteNote.pending, state => {
        state.status = 'pending';
      })
      .addCase(action.deleteNote.rejected, state => {
        state.status = 'failed';
      })
      .addCase(action.addNote.fulfilled, (state, action: PayloadAction<Note>) => {
        state.notes = [...state.notes, action.payload];
        state.status = 'succeeded';
      })
      .addCase(action.addNote.pending, state => {
        state.status = 'pending';
      })
      .addCase(action.addNote.rejected, state => {
        state.status = 'failed';
      })
      .addCase(action.updateNote.fulfilled, (state, action: PayloadAction<any>) => {
        const { key, data } = action.payload;
        state.notes = state.notes.map(n => (n.key === key ? { ...n, ...data } : n)) as Notes;
        state.status = 'succeeded';
      })
      .addCase(action.updateNote.pending, state => {
        state.status = 'pending';
      })
      .addCase(action.updateNote.rejected, state => {
        state.status = 'failed';
      });
  },
});

export const { clearNotes } = notesSlice.actions;

export const selectNotesStore = (state: RootState) => state.notes;
export const selectNotes = (state: RootState) => state.notes.notes;
export const selectNoteByKey = (state: RootState, key: string) => {
  const notes = selectNotes(state);
  return notes.find(note => note.key === key);
};
export const selectNotesStatus = (state: RootState) => state.notes.status;

export default notesSlice.reducer;
