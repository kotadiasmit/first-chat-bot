import { useDispatch, useSelector } from "react-redux";
import NavbarComp from "../Navbar/Navbar";
import { useState } from "react";
import { setUserIndex, submitUser } from "../Store/reducer";
import { useNavigate } from "react-router-dom";
import "./UserDetails.css";
import UserList from "../UserList/UserList";

const UserDetails = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const randomUser = useSelector((state) => state.chatStore.randomUser);

  const showErrorMsg = (trimmedFirstName, trimmedLastName) => {
    if (trimmedFirstName === "" && trimmedLastName !== "") {
      setErrorMsg("please enter valid first name");
    } else if (trimmedFirstName !== "" && trimmedLastName === "") {
      setErrorMsg("please enter valid last name");
    } else if (trimmedFirstName === "" && trimmedLastName === "") {
      setErrorMsg("please enter valid first name & last name");
    }
  };

  const onFirstNameChanged = (event) => {
    const { value } = event.target;
    setFirstName(value);
    setErrorMsg("");
  };

  const onLastNameChanged = (event) => {
    const { value } = event.target;
    setLastName(value);
    setErrorMsg("");
  };

  const onClickSubmit = (event) => {
    event.preventDefault();
    const trimmedFirstName = firstName.trim();
    const trimmedLastName = lastName.trim();
    if (trimmedFirstName && trimmedLastName) {
      let addNewUser = {
        id: randomUser.length ? randomUser[randomUser.length - 1].id + 1 : 1,
        name: `${trimmedFirstName.toLowerCase()} ${trimmedLastName.toLowerCase()}`,
      };
      const checkUserIndex = randomUser.findIndex(
        (user) => user.name === addNewUser.name
      );
      if (checkUserIndex === -1) {
        dispatch(submitUser(addNewUser));
      }
      dispatch(
        setUserIndex(checkUserIndex === -1 ? addNewUser.id - 1 : checkUserIndex)
      );
      setFirstName("");
      setLastName("");
      setErrorMsg("");
      navigate("/userChats");
    } else {
      showErrorMsg(trimmedFirstName, trimmedLastName);
    }
  };
  return (
    <>
      <NavbarComp />
      <div className="d-flex flex-row">
        {randomUser.length ? (
          <ul className="user-list-container">
            <h3>Users List</h3>
            {randomUser.map((user) => (
              <UserList key={user.id} user={user} />
            ))}
          </ul>
        ) : (
          <div className="user-list-container">
            <h3>Users List</h3>
            <h5>No active users.</h5>
          </div>
        )}
        <form className="form-container" onSubmit={onClickSubmit}>
          <div className="form-sub-container d-flex flex-column">
            <label className="label" htmlFor="firstName">
              First Name
            </label>
            <input
              className="input"
              type="text"
              id="firstName"
              placeholder="First name"
              maxLength="10"
              value={firstName}
              onChange={onFirstNameChanged}
              autoFocus
            />
          </div>
          <div className="form-sub-container d-flex flex-column">
            <label className="label" htmlFor="lastName">
              Last Name
            </label>
            <input
              className="input"
              rows={5}
              maxLength="10"
              placeholder="Last name"
              value={lastName}
              onChange={onLastNameChanged}
              id="lastName"
            />
          </div>
          {errorMsg && (
            <p className="error-msg mb-1">
              <sup>*</sup>
              {errorMsg}
            </p>
          )}
          <button className="btn btn-primary mt-3" type="submit">
            Submit
          </button>
        </form>
      </div>
    </>
  );
};
export default UserDetails;
