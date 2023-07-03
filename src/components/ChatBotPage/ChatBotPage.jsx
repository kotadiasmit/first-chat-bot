import "./ChatBotPage.css";
import { useDispatch, useSelector } from "react-redux";
import NavbarComp from "../Navbar/Navbar";
import { useEffect, useRef, useState } from "react";
import { addChatBotMsg } from "../Store/reducer";
import moment from "moment";
import { Navigate } from "react-router-dom";
import ChatBotChat from "../ChatBotChat/ChatBotChat";
import ThreadContainer from "../ThreadContainer/ThreadContainer";

const ChatBotPage = () => {
  const [chatBotUserInput, setChatBotUserInput] = useState("");
  const [isShowThread, setIsShowThread] = useState(false);
  const [chatId, setChatId] = useState(1);
  const [newChatBotChat, setChatBotChat] = useState();

  const dispatch = useDispatch();
  const userIndex = useSelector((state) => state.chatStore.userIndex);

  const randomUser = useSelector((state) =>
    userIndex !== null ? state.chatStore.randomUser[userIndex] : null
  );

  const chatBotChatsArray = useSelector((state) =>
    userIndex !== null ? state.chatStore.chatBotChat[userIndex].myChat : null
  );

  const onChatBotUserInputChanged = (event) => {
    const { value } = event.target;
    setChatBotUserInput(value);
  };

  const showThread = (id) => {
    setIsShowThread(true);
    setChatId(id);
  };

  const closeThread = () => {
    setIsShowThread(false);
  };

  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    scrollToBottom();
  }, [newChatBotChat]);

  const onChatBotSubmit = (event) => {
    event.preventDefault();
    const trimmedChatBotUserInput = chatBotUserInput.trim();
    if (trimmedChatBotUserInput) {
      let addChatBotChat = {
        id: chatBotChatsArray.length + 1 + "u",
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
      setChatBotChat(addChatBotChat);
      dispatch(addChatBotMsg({ userIndex, addChatBotChat }));
      setTimeout(() => {
        let addChatBotChat = {
          id: chatBotChatsArray.length + 1 + "b",
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
        };
        setChatBotChat(addChatBotChat);
        dispatch(addChatBotMsg({ userIndex, addChatBotChat }));
      }, 300);

      setChatBotUserInput("");
    } else {
      alert("please enter valid message");
    }
  };

  if (userIndex === null) {
    return <Navigate to="/" />;
  }
  const userName = randomUser.name;

  return (
    <>
      <NavbarComp />
      <div className="main-chat-container">
        <div className="chatbot-container">
          <h2 className="chat-heading">{userName}</h2>
          <div className="chatbot-chat-container">
            {chatBotChatsArray.map((chat) => (
              <ChatBotChat
                key={chat.id}
                chat={chat}
                showThread={showThread}
                userIndex={userIndex}
              />
            ))}
            <div ref={messagesEndRef} />
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
            closeThread={closeThread}
            userIndex={userIndex}
          />
        )}
      </div>
    </>
  );
};
export default ChatBotPage;
