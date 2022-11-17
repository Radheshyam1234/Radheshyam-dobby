import React from "react";
import { useAuthProvider } from "../../../Context/AuthContext/AuthProvider";
import "./Navbar.css";

export const Navbar = () => {
  const { logoutUser, user } = useAuthProvider();
  return (
    <div className="navbar">
      <button className="btn_logout" onClick={logoutUser}>
        Logout
      </button>
    </div>
  );
};
