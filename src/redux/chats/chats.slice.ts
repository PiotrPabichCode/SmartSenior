import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import * as action from './chats.actions';
import { Chat, Chats } from '@src/models';

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
    updateMessages: (state, action: PayloadAction<Chat>) => {
      const user = action.payload;
      state.chats = [...state.chats, user];
    },
    clearChats: state => {
      state.chats = [];
      state.unseenMessages = 0;
    },
    changeActiveChat: (state, action: PayloadAction<string>) => {
      const userID = action.payload;
      state.chats = state.chats.map(user => ({
        ...user,
        active: user.userID === userID ? !user.active : false,
      }));
    },
  },
  extraReducers: builder => {
    builder.addCase(action.loadChats.fulfilled, (state, action: PayloadAction<any>) => {
      state.chats = action.payload.chatUsers;
      state.unseenMessages = action.payload.unseenMessages;
    });
    builder.addCase(action.addChat.fulfilled, (state, action: PayloadAction<Chat>) => {
      const chat = action.payload;
      state.chats = [...state.chats, chat];
    });
  },
});

export const { updateMessages, changeActiveChat, clearChats } = chatsSlice.actions;

export default chatsSlice.reducer;
