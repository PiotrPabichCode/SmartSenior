import { createAsyncThunk } from '@reduxjs/toolkit';
import { Medicine } from '@src/models';
import * as api from './medicines.api';

export const addMedicine = createAsyncThunk(
  'medicines/addMedicine',
  async (medicine: Medicine, { rejectWithValue }) => {
    try {
      return await api.addMedicine(medicine);
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const deleteMedicine = createAsyncThunk(
  'medicines/deleteMedicine',
  async (key: string, { rejectWithValue }) => {
    try {
      return await api.deleteMedicine(key);
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const loadMedicines = createAsyncThunk(
  'medicines/loadMedicines',
  async (_, { rejectWithValue }) => {
    try {
      return await api.loadMedicines();
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const downloadMedicineFile = createAsyncThunk(
  'medicines/downloadMedicineFile',
  async (url: string, { rejectWithValue }) => {
    try {
      await api.downloadMedicineFile(url);
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
