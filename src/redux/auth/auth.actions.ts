import { createAsyncThunk } from '@reduxjs/toolkit';
import * as api from './auth.api';

import { AuthCredentials, UserDetails } from './auth.types';
import { User } from 'firebase/auth';

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

export const logout = createAsyncThunk('auth/logout', async (_, { rejectWithValue }) => {
  try {
    await api.logout();
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const verifyUserDetails = createAsyncThunk(
  'auth/verifyUserDetails',
  async (_, { rejectWithValue }) => {
    try {
      return await api.checkIfUserDataExists();
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const setUserDetails = createAsyncThunk(
  'auth/setUserDetails',
  async (userDetails: UserDetails, { rejectWithValue }) => {
    try {
      await api.setUserDetails(userDetails);
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const verifyUser = createAsyncThunk('auth/verifyUser', async (user: User | null) => {
  return {
    email: user?.email,
    uid: user?.uid,
  };
});

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
