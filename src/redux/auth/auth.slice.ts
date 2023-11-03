import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import Localization from '@src/localization/Localization';
import * as action from './auth.actions';
import { RootState } from '../store';
import { ConnectedUser, User, UserDetails } from './auth.types';
import { Theme } from '../types';

export interface AuthState {
  user: User | null;
  userDetails: UserDetails | null;
  error: string | null;
  language: string;
  theme: Theme;
  connectedUsers: ConnectedUser[];
  status: 'idle' | 'pending' | 'succeeded' | 'failed';
}

const initialState: AuthState = {
  user: null,
  userDetails: null,
  error: null,
  language: Localization.getLocale(),
  theme: 'light',
  connectedUsers: [],
  status: 'idle',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    changeLanguage: (state, action: PayloadAction<string>) => {
      state.language = action.payload;
    },
    changeTheme: (state, action: PayloadAction<Theme>) => {
      state.theme = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(action.signIn.fulfilled, (state, action: PayloadAction<User>) => {
        state.user = action.payload;
        state.status = 'succeeded';
      })
      .addCase(action.signUp.fulfilled, (state, action: PayloadAction<User>) => {
        state.user = action.payload;
        state.status = 'succeeded';
      })
      .addCase(action.logout.fulfilled, state => {
        state.user = null;
        state.userDetails = null;
        state.connectedUsers = [];
        state.error = null;
        state.status = 'idle';
      })
      .addCase(action.verifyUserDetails.fulfilled, (state, action: PayloadAction<UserDetails>) => {
        state.userDetails = action.payload;
        state.status = 'succeeded';
      })
      .addCase(action.verifyUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.user = action.payload;
      })
      .addCase(
        action.loadConnectedUsers.fulfilled,
        (state, action: PayloadAction<ConnectedUser[]>) => {
          state.connectedUsers = action.payload;
        },
      )
      .addCase(action.addConnectedUser.fulfilled, (state, action: PayloadAction<ConnectedUser>) => {
        state.connectedUsers.push(action.payload);
      })
      .addCase(action.deleteConnectedUser.fulfilled, (state, action: PayloadAction<string>) => {
        state.connectedUsers = state.connectedUsers.filter(
          user => user.userDetails.email !== action.payload,
        );
      });
  },
});

export const { changeLanguage, changeTheme } = authSlice.actions;

export const _userDetails = (state: RootState) => state.auth.userDetails;

export default authSlice.reducer;
