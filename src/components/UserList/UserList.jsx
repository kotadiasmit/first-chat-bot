import { useDispatch, useSelector } from "react-redux";
import "./UserList.css";
import { setUserIndex } from "../Store/reducer";
import { useNavigate } from "react-router-dom";

const UserList = ({ user }) => {
  const { id, name } = user;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userNameClicked = () => {
    dispatch(setUserIndex(id - 1));
    navigate("/userChats");
  };
  const activeUser = useSelector((state) => state.chatStore.userIndex);

  return (
    <li
      className={`user-list ${activeUser === id - 1 ? "activeUser" : null}`}
      onClick={userNameClicked}
    >
      <span className="display-user-name">{name}</span>
    </li>
  );
};
export default UserList;
