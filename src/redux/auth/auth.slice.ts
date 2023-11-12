import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import Localization from '@src/localization/Localization';
import * as action from './auth.actions';
import { ConnectedUser, ConnectedUsers, User, Theme } from '@src/models';

export interface AuthState {
  user: User | null;
  error: string | null;
  language: string;
  theme: Theme;
  connectedUsers: ConnectedUsers;
  status: 'idle' | 'pending' | 'succeeded' | 'failed';
}

const initialState: AuthState = {
  user: null,
  error: null,
  language: Localization.getLocale(),
  theme: 'light',
  connectedUsers: [],
  status: 'pending',
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
    logout: state => {
      state.connectedUsers = [];
      state.error = '';
      state.status = 'idle';
      state.user = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(action.signIn.fulfilled, (state, action: PayloadAction<User>) => {
        state.user = action.payload;
        state.status = 'succeeded';
      })
      .addCase(action.signIn.pending, state => {
        state.status = 'pending';
      })
      .addCase(action.signIn.rejected, state => {
        state.status = 'failed';
      })
      .addCase(action.signUp.fulfilled, (state, action: PayloadAction<User>) => {
        state.user = action.payload;
        state.status = 'succeeded';
      })
      .addCase(action.updateUserData.fulfilled, (state, action: PayloadAction<Partial<User>>) => {
        const data = action.payload;
        const newData = { ...state.user, ...data };
        state.user = newData as User;
      })
      .addCase(action.verifyUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.user = action.payload;
        state.status = 'succeeded';
      })
      .addCase(
        action.loadConnectedUsers.fulfilled,
        (state, action: PayloadAction<ConnectedUsers>) => {
          state.connectedUsers = action.payload;
        },
      )
      .addCase(action.loadConnectedUsers.rejected, state => {
        state.status = 'failed';
      })
      .addCase(action.addConnectedUser.fulfilled, (state, action: PayloadAction<ConnectedUser>) => {
        const newUser = action.payload;
        state.connectedUsers = [...state.connectedUsers, newUser];
      })
      .addCase(action.deleteConnectedUser.fulfilled, (state, action: PayloadAction<string>) => {
        state.connectedUsers = state.connectedUsers.filter(
          user => user.user.email !== action.payload,
        );
      });
  },
});

export const { changeLanguage, changeTheme, logout } = authSlice.actions;

export default authSlice.reducer;
