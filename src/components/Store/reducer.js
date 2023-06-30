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
  },
  reducers: {
    submitUser(state, action) {
      const { id, name } = action.payload;
      const newChat = { userId: id, userName: name, myChat };
      state.randomUser.push(action.payload);
      state.chatBotChat.push(newChat);
    },
    addChatBotMsg(state, action) {
      const { userIndex, addChatBotChat } = action.payload;
      console.log(addChatBotChat);
      console.log(state.chatBotChat);
      state.chatBotChat[userIndex].myChat.push(addChatBotChat);
    },
    updateStar(state, action) {
      const { userIndex, id, value } = action.payload;
      const userChat = state.chatBotChat[userIndex];
      const index = userChat.myChat.findIndex((chat) => chat.id === id);
      console.log(index);
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
      //     const index = chatBotChatsArray.findIndex((chat) => chat.id === chatId);
      // const ThreadArray = useSelector(
      //   (state) => state.chatStore.chatBotChat[userIndex].myChat[index].thread
      // );
      const userChat = state.chatBotChat[userIndex];
      console.log(userChat);
      const index = userChat.myChat.findIndex((chat) => chat.id === chatId);
      console.log(index);
      state.chatBotChat[userIndex].myChat[index].thread.push(addThreadChat);
      //state.chatBotChat[index].thread.push(addThreadChat);
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
