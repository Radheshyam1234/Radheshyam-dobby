import { Login } from "./Components/Authentication/Login";
import { SignUp } from "./Components/Authentication/SignUp";
import { Home } from "./Components/Homepage/Home";
import { Routes, Route } from "react-router-dom";
import { PrivateRoute } from "./Components/PrivateRoute";

export default function App() {
  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signup" element={<SignUp />} />
      </Routes>
    </div>
  );
}
