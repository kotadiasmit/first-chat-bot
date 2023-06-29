import { useDispatch } from "react-redux";
import ThreadChat from "../ThreadChat/ThreadChat";
import { useState } from "react";
import moment from "moment";
import { addThreadMsg } from "../Store/reducer";

const ThreadContainer = (props) => {
  const { chatId, chatBotChatsArray } = props;
  const ThreadArray = chatBotChatsArray[chatId - 1].thread;
  console.log(chatId);
  console.log(chatBotChatsArray[chatId - 1]);
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
      console.log(addThreadChat);
      dispatch(addThreadMsg({ chatId, addThreadChat }));
      setThreadInput("");
    } else {
      alert("please enter valid message");
    }
  };
  return (
    <div className="thread-container">
      <h2 className="chat-heading">{ThreadArray[0].name}</h2>
      <div className="chatbot-chat-container">
        {ThreadArray.map((chat, id) => (
          <ThreadChat key={id} chat={chat} />
        ))}
      </div>
      <form className="chatbot-user-input-container" onSubmit={onThreadSubmit}>
        <input
          className="chatbot-input"
          type="text"
          id="firstName"
          placeholder="Comment Message"
          maxLength="200"
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
