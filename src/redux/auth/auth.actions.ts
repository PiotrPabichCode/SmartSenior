import { createAsyncThunk } from '@reduxjs/toolkit';
import * as api from './auth.api';

import { User as FirebaseUser } from 'firebase/auth';
import { AuthCredentials, Tag, User } from '@src/models';
import Localization from '@src/localization/Localization';
import Calendar from '@src/components/Calendar/Calendar';

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

export const addUserTag = createAsyncThunk(
  'auth/addUserTag',
  async (tag: Tag, { rejectWithValue }) => {
    try {
      return await api.addUserTag(tag);
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const deleteUserTag = createAsyncThunk(
  'auth/deleteUserTag',
  async (uid: string, { rejectWithValue }) => {
    try {
      return await api.deleteUserTag(uid);
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const loadUserTags = createAsyncThunk(
  'auth/loadUserTags',
  async (_, { rejectWithValue }) => {
    try {
      return await api.loadUserTags();
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const logout = () => {
  api.logout();
};

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

export const changeLanguage = createAsyncThunk('auth/language', async (language: string) => {
  await Localization.changeLanguage(language);
  Calendar.changeLanguage(language);
  return language;
});

export const loadConnectedUsers = createAsyncThunk(
  'auth/loadConnectedUsers',
  async (uid: string, { rejectWithValue }) => {
    try {
      return await api.loadConnectedUsers(uid);
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
