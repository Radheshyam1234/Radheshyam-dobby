import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthProvider } from "../../Context/AuthContext/AuthProvider";

import "./styles.css";

export const Login = () => {
  const { loginUser } = useAuthProvider();
  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
  });

  const loginHandler = () => {
    if (!loginDetails.email || !loginDetails.password) {
      alert("Please Enter Both the fields");
      return;
    }
    loginUser(loginDetails);
  };

  const guestLoginHandler = () => {
    setLoginDetails({
      email: "guestabc@gmail.com",
      password: "g123",
    });
    loginUser(loginDetails);
  };

  return (
    <div class="login-page">
      <div class="form">
        <div class="login-form">
          <input
            type="text"
            placeholder="email"
            value={loginDetails.email}
            onChange={(e) => {
              setLoginDetails((prev) => ({
                ...prev,
                email: e.target.value,
              }));
            }}
          />
          <input
            type="password"
            placeholder="password"
            value={loginDetails.password}
            onChange={(e) => {
              setLoginDetails((prev) => ({
                ...prev,
                password: e.target.value,
              }));
            }}
          />
          <button onClick={loginHandler}>login</button>
          <button onClick={guestLoginHandler}>Guest Login</button>
          <p class="message">
            Not registered? <Link to="/signup">Create an account</Link>
          </p>
        </div>
      </div>
    </div>
  );
};
