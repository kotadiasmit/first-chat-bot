import { useDispatch, useSelector } from "react-redux";
import ThreadChat from "../ThreadChat/ThreadChat";
import { useEffect, useRef, useState } from "react";
import moment from "moment";
import { addThreadMsg } from "../Store/reducer";
import { AiOutlineClose } from "react-icons/ai";
import "./ThreadContainer.css";

const ThreadContainer = ({
  chatId,
  chatBotChatsArray,
  closeThread,
  userIndex,
}) => {
  const index = chatBotChatsArray.findIndex((chat) => chat.id === chatId);
  const ThreadArray = useSelector(
    (state) => state.chatStore.chatBotChat[userIndex].myChat[index].thread
  );
  const randomUser = useSelector(
    (state) => state.chatStore.randomUser[userIndex]
  );
  const userName = randomUser.name;
  const endRef = useRef(null);

  const scrollToBottom = () => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const dispatch = useDispatch();

  const [threadInput, setThreadInput] = useState("");
  const [newThread, setNewThread] = useState();
  const onThreadInputChanged = (event) => {
    const { value } = event.target;
    setThreadInput(value);
  };

  useEffect(() => {
    scrollToBottom();
  }, [newThread]);

  const onThreadSubmit = (event) => {
    event.preventDefault();
    const trimmedThreadInput = threadInput.trim();
    if (trimmedThreadInput) {
      let addThreadChat = {
        name: userName,
        threadMsg: trimmedThreadInput,
        msgTime: moment(new Date()).format("LT"),
      };
      setNewThread(addThreadChat);
      dispatch(addThreadMsg({ userIndex, chatId, index, addThreadChat }));
      setThreadInput("");
    } else {
      alert("please enter valid message");
    }
  };

  const onThreadClose = () => {
    closeThread();
  };

  return (
    <div className="thread-container">
      <div className="thread-header">
        <h2 className="thread-heading m-0">{ThreadArray[0].name}</h2>
        <AiOutlineClose className="thread-close-btn" onClick={onThreadClose} />
      </div>
      <div className="thread-chat-container">
        {ThreadArray.map((chat, id) => (
          <ThreadChat key={id} chat={chat} />
        ))}
        <div ref={endRef} />
      </div>
      <form className="chatbot-user-input-container" onSubmit={onThreadSubmit}>
        <input
          className="chatbot-input"
          type="text"
          id="thread"
          placeholder="Comment Message"
          maxLength="100"
          value={threadInput}
          onChange={onThreadInputChanged}
          autoFocus
        />
        <button className="send-btn" type="submit">
          Send
        </button>
      </form>
    </div>
  );
};
export default ThreadContainer;
