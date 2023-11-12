import state from './store';
import type { RootState } from './store';

export const getEventsStore = (state: RootState) => state.events;
export const getChatsStore = (state: RootState) => state.chats;
export const getAuthStore = (state: RootState) => state.auth;
export const getConnectedUsers = (state: RootState) => state.auth.connectedUsers;
export const getConnectedUsersIds = (state: RootState) => state.auth.user?.connectedUsersIds;
export const getEmail = (state: RootState) => state.auth.user?.email;
export const getUser = (state: RootState) => state.auth.user;
export const getUserID = (state: RootState) => state.auth.user?.uid;
