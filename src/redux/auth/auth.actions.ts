import { createAsyncThunk } from '@reduxjs/toolkit';
import * as api from './auth.api';

import { User as FirebaseUser } from 'firebase/auth';
import { AuthCredentials, User } from '@src/models';

export const signIn = createAsyncThunk(
  'auth/signIn',
  async (credentials: AuthCredentials, { rejectWithValue }) => {
    try {
      return await api.signIn(credentials);
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const signUp = createAsyncThunk(
  'auth/signUp',
  async (credentials: AuthCredentials, { rejectWithValue }) => {
    try {
      return await api.signUp(credentials);
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const updateUserData = createAsyncThunk(
  'auth/updateUserData',
  async ({ uid, values }: { uid: string; values: Partial<User> }, { rejectWithValue }) => {
    try {
      return await api.updateUserData(uid, values);
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const logout = createAsyncThunk('auth/logout', async (_, { rejectWithValue }) => {
  try {
    await api.logout();
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const verifyUser = createAsyncThunk(
  'auth/verifyUser',
  async (user: FirebaseUser | null, { rejectWithValue }) => {
    try {
      if (!user) {
        throw new Error('User not verified');
      }
      return await api.loadUserDoc(user);
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const loadConnectedUsers = createAsyncThunk(
  'auth/loadConnectedUsers',
  async (_, { rejectWithValue }) => {
    try {
      return await api.loadConnectedUsers();
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const addConnectedUser = createAsyncThunk(
  'auth/addConnectedUser',
  async (email: string, { rejectWithValue }) => {
    try {
      return await api.addConnectedUser(email);
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const deleteConnectedUser = createAsyncThunk(
  'auth/deleteConnectedUser',
  async (email: string, { rejectWithValue }) => {
    try {
      return await api.deleteConnectedUser(email);
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);