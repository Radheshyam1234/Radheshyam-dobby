import { useState } from "react";
import { useAuthProvider } from "../../Context/AuthContext/AuthProvider";
import { Link } from "react-router-dom";

import "./styles.css";

export const SignUp = () => {
  const { signUpNewUser } = useAuthProvider();

  const [signUpDetails, setSignUpDetails] = useState({
    userName: "",
    email: "",
    password: "",
  });

  const createAccount = () => {
    if (
      !signUpDetails.userName ||
      !signUpDetails.email ||
      !signUpDetails.password
    ) {
      alert("Please Enter all the details");
      return;
    }

    signUpNewUser(signUpDetails);
  };

  return (
    <div class="login-page">
      <div class="form">
        <div class="register-form">
          <input
            type="text"
            placeholder="Username"
            onChange={(e) => {
              setSignUpDetails((prev) => ({
                ...prev,
                userName: e.target.value,
              }));
            }}
          />
          <input
            type="email"
            placeholder="Email address"
            onChange={(e) => {
              setSignUpDetails((prev) => ({
                ...prev,
                email: e.target.value,
              }));
            }}
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => {
              setSignUpDetails((prev) => ({
                ...prev,
                password: e.target.value,
              }));
            }}
          />

          <button onClick={createAccount}>create</button>
          <p class="message">
            Already registered? <Link to="/login"> Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  );
};
