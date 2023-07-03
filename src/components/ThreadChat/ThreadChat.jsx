import "./ThreadChat.css";
const ThreadChat = ({ chat }) => {
  const { name, threadMsg, msgTime } = chat;

  return (
    <div className="user-thread-container">
      <p className="user-name">
        {name}
        <span className="time-span">{msgTime}</span>
      </p>
      <p className="chat">{threadMsg}</p>
    </div>
  );
};
export default ThreadChat;
