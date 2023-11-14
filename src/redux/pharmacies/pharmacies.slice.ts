import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import * as action from './pharmacies.actions';
import { Pharmacies, Pharmacy } from '@src/models';

export interface PharmaciesState {
  pharmacies: Pharmacies;
  status: 'idle' | 'pending' | 'succeeded' | 'failed';
  error: string;
}

const initialState: PharmaciesState = {
  pharmacies: [],
  status: 'idle',
  error: '',
};

export const pharmaciesSlice = createSlice({
  name: 'pharmacies',
  initialState,
  reducers: {
    clearPharmacies: state => {
      state.pharmacies = [];
      state.status = 'idle';
      state.error = '';
    },
  },
  extraReducers: builder => {
    builder
      .addCase(action.loadPharmacies.fulfilled, (state, action: PayloadAction<Pharmacies>) => {
        state.pharmacies = action.payload;
        state.status = 'succeeded';
      })
      .addCase(action.loadPharmacies.pending, state => {
        state.status = 'pending';
      })
      .addCase(action.loadPharmacies.rejected, state => {
        state.status = 'failed';
      })
      .addCase(action.deletePharmacy.fulfilled, (state, action: PayloadAction<string>) => {
        state.pharmacies = state.pharmacies.filter(m => m.key !== action.payload);
      })
      .addCase(action.addPharmacy.fulfilled, (state, action: PayloadAction<Pharmacy>) => {
        state.pharmacies = [...state.pharmacies, action.payload];
      });
  },
});

export const { clearPharmacies } = pharmaciesSlice.actions;

export const selectPharmaciesStore = (state: RootState) => state.pharmacies;
export const selectPharmacies = (state: RootState) => state.pharmacies.pharmacies;
export const selectPharmaciesStatus = (state: RootState) => state.pharmacies.status;

export default pharmaciesSlice.reducer;
