import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";

const chatReducer = createSlice({
  name: "chats",
  initialState: {
    randomUser: {},
    chatBotChat: [
      {
        id: "1b",
        name: "Bot User",
        chatBotMsg: "Hi I am bot user. How can I help you?",
        msgTime: moment(new Date()).format("LT"),
        stared: false,
        loved: false,
        thread: [
          {
            name: "Bot User",
            threadMsg: "Hi I am bot user. How can I help you?",
            msgTime: moment(new Date()).format("LT"),
          },
        ],
      },
    ],
  },
  reducers: {
    submitUser(state, action) {
      state.randomUser = action.payload;
    },
    addChatBotMsg(state, action) {
      state.chatBotChat.push(action.payload);
    },
    updateStar(state, action) {
      const { id, value } = action.payload;
      const index = state.chatBotChat.findIndex((chat) => chat.id === id);
      state.chatBotChat[index].stared = value;
    },
    updateLoved(state, action) {
      const { id, value } = action.payload;
      const index = state.chatBotChat.findIndex((chat) => chat.id === id);
      state.chatBotChat[index].loved = value;
    },
    addThreadMsg(state, action) {
      const { chatId, addThreadChat } = action.payload;
      const index = state.chatBotChat.findIndex((chat) => chat.id === chatId);
      state.chatBotChat[index].thread.push(addThreadChat);
    },
    removeChats(state) {
      const newChat = state.chatBotChat.slice(0, 1);
      state.chatBotChat = newChat;
    },
  },
});
export const {
  submitUser,
  addChatBotMsg,
  updateStar,
  updateLoved,
  addThreadMsg,
  removeChats,
} = chatReducer.actions;
export default chatReducer.reducer;
