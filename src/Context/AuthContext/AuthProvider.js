import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useImageProvider } from "../ImageContext/ImageProvider";
import axios from "axios";
import { API_URL } from "../../utilities/ApiUrl";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { imagesDispatch } = useImageProvider();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const signUpNewUser = async ({ userName, email, password }) => {
    try {
      const {
        data: { response },
        status,
      } = await axios({
        method: "POST",
        url: `${API_URL}/users/signup`,
        data: {
          userName,
          email,
          password,
        },
      });

      if (status == 201) {
        localStorage.setItem("token", JSON.stringify(response.token));
        console.log(response);
        setUser(response.NewUser);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const loginUser = async ({ email, password }) => {
    try {
      const {
        data: { response },
        status,
      } = await axios({
        method: "POST",
        url: `${API_URL}/users/login`,
        data: {
          email,
          password,
        },
      });

      console.log(response);
      if (status == 201) {
        localStorage.setItem("token", response.token);
        setUser(response.user);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const logoutUser = () => {
    localStorage.clear();
    setUser(null);
    imagesDispatch({ type: "RESET_GALLERY" });
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loginUser,
        logoutUser,
        signUpNewUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export const useAuthProvider = () => useContext(AuthContext);
