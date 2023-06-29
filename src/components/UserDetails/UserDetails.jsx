import { useDispatch } from "react-redux";
import NavbarComp from "../Navbar/Navbar";
import "./UserDetails.scss";
import { useState } from "react";
import { submitUser } from "../Store/reducer";
import { useNavigate } from "react-router-dom";

const UserDetails = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  // const randomUser = useSelector((state) => state.chatStore.randomUser);
  const dispatch = useDispatch();

  const showErrorMsg = (trimmedFirstName, trimmedLastName) => {
    if (trimmedFirstName === "" && trimmedLastName !== "") {
      setErrorMsg("please enter valid firstname");
    } else if (trimmedFirstName !== "" && trimmedLastName === "") {
      setErrorMsg("please enter valid lastname");
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
        id: 1,
        firstName: trimmedFirstName,
        lastName: trimmedLastName,
      };
      dispatch(submitUser(addNewUser));
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
