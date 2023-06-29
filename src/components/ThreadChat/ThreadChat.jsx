import "./ThreadChat.css";

const ThreadChat = (props) => {
  const { chat } = props;
  const { name, threadMsg, msgTime } = chat;

  return (
    <>
      <div className="user-chatbot-container">
        <div>
          <p className="user-name">
            {name}
            <span className="time-span">{msgTime}</span>
          </p>
          <p className="chat">{threadMsg}</p>
        </div>
      </div>
    </>
  );
};
export default ThreadChat;
