import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import * as action from './chats.actions';
import { Chat, Chats } from '@src/models';
import type { RootState } from '../store';

export interface ChatState {
  chats: Chats;
  unseenMessages: number;
}

const initialState: ChatState = {
  chats: [],
  unseenMessages: 0,
};

export const chatsSlice = createSlice({
  name: 'chats',
  initialState,
  reducers: {
    clearChats: state => {
      state.chats = [];
      state.unseenMessages = 0;
    },
    changeActiveChat: (state, action: PayloadAction<string>) => {
      const userID = action.payload;
      state.chats = state.chats.map(chat => ({
        ...chat,
        active: chat.users.findIndex(user => user.uid === userID) === -1 ? false : true,
      }));
    },
  },
  extraReducers: builder => {
    builder.addCase(action.loadChats.fulfilled, (state, action: PayloadAction<any>) => {
      state.chats = action.payload.chats;
      state.unseenMessages = action.payload.unseenMessages;
    });
    builder.addCase(action.addChat.fulfilled, (state, action: PayloadAction<Chat>) => {
      const chat = action.payload;
      state.chats = [...state.chats, chat];
    });
  },
});

export const { changeActiveChat, clearChats } = chatsSlice.actions;

export const selectChatsStore = (state: RootState) => state.chats;
export const selectChats = (state: RootState) => state.chats.chats;
export const selectActiveChat = (state: RootState) => {
  const chats = selectChats(state);
  return chats.find(chat => chat.active);
};
export const selectChatsUnseenMessages = (state: RootState) => state.chats.unseenMessages;

export default chatsSlice.reducer;
