import "./ChatBotPage.scss";
import { useDispatch, useSelector } from "react-redux";
import NavbarComp from "../Navbar/Navbar";
import { useState } from "react";
import { addChatBotMsg } from "../Store/reducer";
import moment from "moment";
import { Navigate } from "react-router-dom";
import ChatBotChat from "../ChatBotChat/ChatBotChat";
import ThreadContainer from "../ThreadContainer/ThreadContainer";

let chatId = 1;
const ChatBotPage = () => {
  const [chatBotUserInput, setChatBotUserInput] = useState("");
  const [isShowThread, setIsShowThread] = useState(false);

  const dispatch = useDispatch();
  const randomUser = useSelector((state) => state.chatStore.randomUser);
  const userName = `${randomUser.firstName} ${randomUser.lastName}`;
  console.log(randomUser);

  const chatBotChatsArray = useSelector((state) => state.chatStore.chatBotChat);
  console.log(chatBotChatsArray);

  const onChatBotUserInputChanged = (event) => {
    const { value } = event.target;
    setChatBotUserInput(value);
  };

  const showThread = (id) => {
    setIsShowThread((prevState) => !prevState);
    chatId = id;
  };

  const onChatBotSubmit = (event) => {
    event.preventDefault();
    const trimmedChatBotUserInput = chatBotUserInput.trim();
    if (trimmedChatBotUserInput) {
      let addChatBotChat = {
        id: chatBotChatsArray.length
          ? chatBotChatsArray[chatBotChatsArray.length - 1].id + 1
          : 1,
        name: userName,
        chatBotMsg: trimmedChatBotUserInput,
        msgTime: moment(new Date()).format("LT"),
        stared: false,
        loved: false,
        thread: [
          {
            name: userName,
            threadMsg: trimmedChatBotUserInput,
            msgTime: moment(new Date()).format("LT"),
          },
        ],
      };
      dispatch(addChatBotMsg(addChatBotChat));
      setTimeout(() => {
        let addBotChat = {
          id: chatBotChatsArray[chatBotChatsArray.length - 1].id + 2,
          name: "Bot User",
          chatBotMsg: "Hi I am bot user. How can I help you?",
          msgTime: moment(new Date()).format("LT"),
          stared: false,
          loved: false,
          thread: [
            {
              id: chatBotChatsArray[chatBotChatsArray.length - 1].thread.id + 1,
              name: "Bot User",
              threadMsg: "Hi I am bot user. How can I help you?",
              msgTime: moment(new Date()).format("LT"),
            },
          ],
        };
        dispatch(addChatBotMsg(addBotChat));
      }, 300);

      setChatBotUserInput("");
    } else {
      alert("please enter valid message");
    }
  };

  if (!randomUser.firstName) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <NavbarComp />
      <div className="main-chat-container">
        <div className="chatbot-container">
          <h2 className="chat-heading">{userName}</h2>
          <div className="chatbot-chat-container">
            {chatBotChatsArray.map((chat) => (
              <ChatBotChat key={chat.id} chat={chat} showThread={showThread} />
            ))}
          </div>
          <form
            className="chatbot-user-input-container"
            onSubmit={onChatBotSubmit}
          >
            <input
              className="chatbot-input"
              type="text"
              id="firstName"
              placeholder="Comment Message"
              maxLength="200"
              value={chatBotUserInput}
              onChange={onChatBotUserInputChanged}
              autoFocus
            />
            <button className="send-btn" type="submit">
              Send
            </button>
          </form>
        </div>
        {isShowThread && (
          <ThreadContainer
            chatId={chatId}
            chatBotChatsArray={chatBotChatsArray}
          />
        )}
      </div>
    </>
  );
};
export default ChatBotPage;
