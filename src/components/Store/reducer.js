import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";

const myChat = [
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
];

const chatReducer = createSlice({
  name: "chats",
  initialState: {
    randomUser: [],
    chatBotChat: [],
    userIndex: null,
  },
  reducers: {
    submitUser(state, action) {
      const { id, name } = action.payload;
      const newChat = { userId: id, userName: name, myChat };
      state.randomUser.push(action.payload);
      state.chatBotChat.push(newChat);
    },
    setUserIndex(state, action) {
      state.userIndex = action.payload;
    },
    addChatBotMsg(state, action) {
      const { userIndex, addChatBotChat } = action.payload;
      state.chatBotChat[userIndex].myChat.push(addChatBotChat);
    },
    updateStar(state, action) {
      const { userIndex, id, value } = action.payload;
      const userChat = state.chatBotChat[userIndex];
      const index = userChat.myChat.findIndex((chat) => chat.id === id);
      state.chatBotChat[userIndex].myChat[index].stared = value;
    },
    updateLoved(state, action) {
      const { userIndex, id, value } = action.payload;
      const userChat = state.chatBotChat[userIndex];
      const index = userChat.myChat.findIndex((chat) => chat.id === id);
      state.chatBotChat[userIndex].myChat[index].loved = value;
    },
    addThreadMsg(state, action) {
      const { userIndex, chatId, addThreadChat } = action.payload;
      const userChat = state.chatBotChat[userIndex];
      const index = userChat.myChat.findIndex((chat) => chat.id === chatId);
      state.chatBotChat[userIndex].myChat[index].thread.push(addThreadChat);
    },
  },
});
export const {
  submitUser,
  setUserIndex,
  addChatBotMsg,
  updateStar,
  updateLoved,
  addThreadMsg,
} = chatReducer.actions;
export default chatReducer.reducer;
