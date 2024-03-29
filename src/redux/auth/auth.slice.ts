import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import * as action from './auth.actions';
import { ConnectedUser, ConnectedUsers, User, Theme, Tag, Tags } from '@src/models';
import type { RootState } from '../store';

export interface AuthState {
  user: User | null;
  error: string | null;
  language: string | null;
  theme: Theme | null;
  connectedUsers: ConnectedUsers;
  status: 'idle' | 'pending' | 'succeeded' | 'failed';
}

const initialState: AuthState = {
  user: null,
  error: null,
  language: null,
  theme: null,
  connectedUsers: [],
  status: 'pending',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: state => {
      state.connectedUsers = [];
      state.error = '';
      state.status = 'idle';
      state.user = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(action.changeTheme.fulfilled, (state, action: PayloadAction<Theme>) => {
        state.theme = action.payload;
      })
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
      .addCase(action.signInWithOAuthGoogle.fulfilled, (state, action: PayloadAction<User>) => {
        state.user = action.payload;
        state.status = 'succeeded';
      })
      .addCase(action.signInWithOAuthGoogle.pending, state => {
        state.status = 'pending';
      })
      .addCase(action.signInWithOAuthGoogle.rejected, state => {
        state.status = 'failed';
      })
      .addCase(action.signUp.fulfilled, (state, action: PayloadAction<User>) => {
        state.user = action.payload;
        state.status = 'succeeded';
      })
      .addCase(action.signUp.pending, state => {
        state.status = 'pending';
      })
      .addCase(action.signUp.rejected, state => {
        state.status = 'failed';
      })
      .addCase(action.updateUserData.fulfilled, (state, action: PayloadAction<Partial<User>>) => {
        const data = action.payload;
        const newData = { ...state.user, ...data };
        state.user = newData as User;
      })
      .addCase(action.updateUserData.pending, state => {
        state.status = 'pending';
      })
      .addCase(action.updateUserData.rejected, state => {
        state.status = 'failed';
      })
      .addCase(action.verifyUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.user = action.payload;
        state.status = 'succeeded';
      })
      .addCase(action.verifyUser.pending, state => {
        state.status = 'pending';
      })
      .addCase(action.verifyUser.rejected, state => {
        state.status = 'failed';
      })
      .addCase(
        action.loadConnectedUsers.fulfilled,
        (state, action: PayloadAction<ConnectedUsers>) => {
          state.connectedUsers = action.payload;
        },
      )
      .addCase(action.loadConnectedUsers.pending, state => {
        state.status = 'pending';
      })
      .addCase(action.loadConnectedUsers.rejected, state => {
        state.status = 'failed';
      })
      .addCase(action.addConnectedUser.fulfilled, (state, action: PayloadAction<ConnectedUser>) => {
        state.connectedUsers = [...state.connectedUsers, action.payload];
      })
      .addCase(action.addConnectedUser.pending, state => {
        state.status = 'pending';
      })
      .addCase(action.addConnectedUser.rejected, state => {
        state.status = 'failed';
      })
      .addCase(action.deleteConnectedUser.fulfilled, (state, action: PayloadAction<string>) => {
        state.connectedUsers = state.connectedUsers.filter(
          user => user.user.email !== action.payload,
        );
      })
      .addCase(action.deleteConnectedUser.pending, state => {
        state.status = 'pending';
      })
      .addCase(action.deleteConnectedUser.rejected, state => {
        state.status = 'failed';
      })
      .addCase(action.changeLanguage.fulfilled, (state, action: PayloadAction<string>) => {
        state.language = action.payload;
      })
      .addCase(action.changeLanguage.pending, state => {
        state.status = 'pending';
      })
      .addCase(action.changeLanguage.rejected, state => {
        state.status = 'failed';
      })
      .addCase(action.addUserTag.fulfilled, (state, action: PayloadAction<Tag>) => {
        if (state.user) {
          state.user.tags = [...state.user.tags, action.payload];
        }
      })
      .addCase(action.addUserTag.pending, state => {
        state.status = 'pending';
      })
      .addCase(action.addUserTag.rejected, state => {
        state.status = 'failed';
      })
      .addCase(action.loadUserTags.fulfilled, (state, action: PayloadAction<Tags>) => {
        if (state.user) {
          state.user.tags = action.payload;
        }
      })
      .addCase(action.loadUserTags.pending, state => {
        state.status = 'pending';
      })
      .addCase(action.loadUserTags.rejected, state => {
        state.status = 'failed';
      })
      .addCase(action.updateUserTag.fulfilled, (state, action: PayloadAction<Tag>) => {
        const tag = action.payload;
        if (state.user) {
          const updatedTags = state.user.tags.map(t => (t.id !== tag.id ? t : tag));
          state.user.tags = updatedTags;
        }
        state.status = 'succeeded';
      })
      .addCase(action.updateUserTag.pending, state => {
        state.status = 'pending';
      })
      .addCase(action.updateUserTag.rejected, state => {
        state.status = 'failed';
      })
      .addCase(action.deleteUserTag.fulfilled, (state, action: PayloadAction<string>) => {
        if (state.user) {
          state.user.tags = state.user.tags.filter(tag => tag.id !== action.payload);
        }
      })
      .addCase(action.deleteUserTag.pending, state => {
        state.status = 'pending';
      })
      .addCase(action.deleteUserTag.rejected, state => {
        state.status = 'failed';
      });
  },
});

export const { logout } = authSlice.actions;

export const selectAuthStore = (state: RootState) => state.auth;
export const selectUser = (state: RootState) => state.auth.user;
export const selectUserID = (state: RootState) => {
  const user = selectUser(state);
  return user?.uid;
};
export const selectEmail = (state: RootState) => {
  const user = selectUser(state);
  return user?.email;
};
export const selectPhoneNumber = (state: RootState) => {
  const user = selectUser(state);
  return user?.phoneNumber;
};
export const selectUserConnectedUsersIds = (state: RootState) => {
  const user = selectUser(state);
  return user?.connectedUsersIds;
};
export const selectUserConnectedUserIdById = (state: RootState, uid: string) => {
  const connectedUsersIds = selectUserConnectedUsersIds(state);
  return connectedUsersIds?.find(id => id === uid);
};
export const selectTags = (state: RootState) => {
  const user = selectUser(state);
  return user?.tags;
};

export const selectTagById = (state: RootState, id: string) => {
  const tags = selectTags(state);
  return tags?.find(t => t.id === id);
};

export const selectRole = (state: RootState) => state.auth.user?.role;
export const selectLanguage = (state: RootState) => state.auth.language;
export const selectTheme = (state: RootState) => state.auth.theme;
export const selectAuthStatus = (state: RootState) => state.auth.status;
export const selectAuthError = (state: RootState) => state.auth.error;
export const selectConnectedUsers = (state: RootState) => state.auth.connectedUsers;
export const selectConnectedUserById = (state: RootState, uid: string) => {
  const connectedUsers = selectConnectedUsers(state);
  return connectedUsers.find(user => user.user.uid === uid);
};

export default authSlice.reducer;
