import { useDispatch } from "react-redux";
import "./ChatBotChat.css";
import { AiFillStar, AiFillHeart, AiFillMessage } from "react-icons/ai";
import { updateLoved, updateStar } from "../Store/reducer";

const ChatBotChat = ({ chat, showThread, userIndex }) => {
  const { id, name, chatBotMsg, msgTime, stared, loved } = chat;
  const dispatch = useDispatch();

  const onClickStar = () => {
    dispatch(updateStar({ userIndex, id, value: !stared }));
  };
  const onClickHeart = () => {
    dispatch(updateLoved({ userIndex, id, value: !loved }));
  };
  const onClickThread = () => {
    showThread(id);
  };

  return (
    <div className="user-chatbot-container">
      <div>
        <p className="user-name">
          {name}
          <span className="time-span">{msgTime}</span>
        </p>
        <p className="chat">{chatBotMsg}</p>
        <div>
          {stared && <AiFillStar color="yellow" className="chat-icons" />}
          {loved && <AiFillHeart color="red" className="chat-icons" />}
        </div>
      </div>
      <div>
        <AiFillStar color="yellow" className="icons" onClick={onClickStar} />
        <AiFillHeart color="red" className="icons" onClick={onClickHeart} />
        <AiFillMessage color="gray" className="icons" onClick={onClickThread} />
      </div>
    </div>
  );
};
export default ChatBotChat;
