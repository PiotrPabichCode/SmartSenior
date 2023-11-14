import { createAsyncThunk } from '@reduxjs/toolkit';
import { Pharmacy } from '@src/models';
import * as api from './pharmacies.api';

export const addPharmacy = createAsyncThunk(
  'pharmacies/addPharmacy',
  async (pharmacy: Pharmacy, { rejectWithValue }) => {
    try {
      return await api.addPharmacy(pharmacy);
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const deletePharmacy = createAsyncThunk(
  'pharmacies/deletePharmacy',
  async (key: string, { rejectWithValue }) => {
    try {
      return await api.deletePharmacy(key);
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const loadPharmacies = createAsyncThunk(
  'pharmacies/loadPharmacies',
  async (_, { rejectWithValue }) => {
    try {
      return await api.loadPharmacies();
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
