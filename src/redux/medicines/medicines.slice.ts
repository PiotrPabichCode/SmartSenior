import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import * as action from './medicines.actions';
import { Medicine, Medicines } from '@src/models';
import type { RootState } from '../store';

export interface MedicinesState {
  medicines: Medicines;
  status: 'idle' | 'pending' | 'succeeded' | 'failed';
  error: string;
}

const initialState: MedicinesState = {
  medicines: [],
  status: 'idle',
  error: '',
};

export const medicinesSlice = createSlice({
  name: 'medicines',
  initialState,
  reducers: {
    clearMedicines: state => {
      state.medicines = [];
      state.status = 'idle';
      state.error = '';
    },
  },
  extraReducers: builder => {
    builder
      .addCase(action.loadMedicines.fulfilled, (state, action: PayloadAction<Medicines>) => {
        state.medicines = action.payload;
        state.status = 'succeeded';
      })
      .addCase(action.loadMedicines.pending, state => {
        state.status = 'pending';
      })
      .addCase(action.loadMedicines.rejected, state => {
        state.status = 'failed';
      })
      .addCase(action.deleteMedicine.fulfilled, (state, action: PayloadAction<string>) => {
        state.medicines = state.medicines.filter(m => m.key !== action.payload);
      })
      .addCase(action.addMedicine.fulfilled, (state, action: PayloadAction<Medicine>) => {
        state.medicines = [...state.medicines, action.payload];
      });
  },
});

export const { clearMedicines } = medicinesSlice.actions;

export const selectMedicinesStore = (state: RootState) => state.medicines;
export const selectMedicines = (state: RootState) => state.medicines.medicines;
export const selectMedicinesStatus = (state: RootState) => state.medicines.status;

export default medicinesSlice.reducer;
