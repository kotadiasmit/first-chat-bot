import { useDispatch, useSelector } from "react-redux";
import NavbarComp from "../Navbar/Navbar";
import { useState } from "react";
import { submitUser } from "../Store/reducer";
import { useNavigate } from "react-router-dom";
import "./UserDetails.css";

const UserDetails = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const randomUser = useSelector((state) => state.chatStore.randomUser);
  const chatBotArray = useSelector((state) => state.chatStore.chatBotChat);
  const dispatch = useDispatch();
  console.log(randomUser);
  console.log(chatBotArray);

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
        name: `${trimmedFirstName} ${trimmedLastName}`,
      };
      const checkUserIndex = randomUser.findIndex(
        (user) => user.name.toLowerCase() === addNewUser.name.toLowerCase()
      );
      if (checkUserIndex === -1) {
        dispatch(submitUser(addNewUser));
      }
      //dispatch(removeChats());
      setFirstName("");
      setLastName("");
      setErrorMsg("");
      navigate("/userChats", {
        state: { userIndex: checkUserIndex === -1 ? 0 : checkUserIndex },
      });
    } else {
      showErrorMsg(trimmedFirstName, trimmedLastName);
    }
  };

  return (
    <>
      <NavbarComp />
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
    </>
  );
};
export default UserDetails;
