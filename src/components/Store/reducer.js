import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";

const chatReducer = createSlice({
  name: "chats",
  initialState: {
    randomUser: {},
    chatBotChat: [
      {
        id: 1,
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
      console.log(action);
      state.chatBotChat.push(action.payload);
    },
    updateStar(state, action) {
      const { id, value } = action.payload;
      state.chatBotChat[id - 1].stared = value;
    },
    updateLoved(state, action) {
      const { id, value } = action.payload;
      console.log(action.payload);
      state.chatBotChat[id - 1].loved = value;
    },
    addThreadMsg(state, action) {
      const { chatId, addThreadChat } = action.payload;
      console.log(action.payload);
      state.chatBotChat[chatId - 1].thread.push(addThreadChat);
    },
  },
});
export const {
  submitUser,
  addChatBotMsg,
  updateStar,
  updateLoved,
  addThreadMsg,
} = chatReducer.actions;
export default chatReducer.reducer;
