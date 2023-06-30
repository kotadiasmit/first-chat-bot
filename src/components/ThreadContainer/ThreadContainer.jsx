import "./ThreadContainer.css";
import { useDispatch } from "react-redux";
import ThreadChat from "../ThreadChat/ThreadChat";
import { useState } from "react";
import moment from "moment";
import { addThreadMsg } from "../Store/reducer";
import { AiOutlineClose } from "react-icons/ai";

const ThreadContainer = (props) => {
  const { chatId, chatBotChatsArray, closeThread } = props;
  const index = chatBotChatsArray.findIndex((chat) => chat.id === chatId);
  const ThreadArray = chatBotChatsArray[index].thread;
  const userName = ThreadArray[0].name;

  const dispatch = useDispatch();

  const [threadInput, setThreadInput] = useState("");
  const onThreadInputChanged = (event) => {
    const { value } = event.target;
    setThreadInput(value);
  };

  const onThreadSubmit = (event) => {
    event.preventDefault();
    const trimmedThreadInput = threadInput.trim();
    if (trimmedThreadInput) {
      let addThreadChat = {
        name: userName,
        threadMsg: trimmedThreadInput,
        msgTime: moment(new Date()).format("LT"),
      };
      dispatch(addThreadMsg({ chatId, addThreadChat }));
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
        <h2 className="m-0">{ThreadArray[0].name}</h2>
        <AiOutlineClose className="thread-close-btn" onClick={onThreadClose} />
      </div>
      <div className="thread-chat-container">
        {ThreadArray.map((chat, id) => (
          <ThreadChat key={id} chat={chat} />
        ))}
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
