import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import PrivateRoutes from "./utils/PrivateRoutes";
import { useEffect, useState } from "react";
import Login from "./pages/Login";
import Home from "./pages/Home";
import {
  getUserByUserById,
  getUserLoggedInUser,
  updateLoggedInUser,
} from "./manager/user.manager";
import { CircularProgress } from "@mui/material";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  const [loadContent, setLoadContent] = useState({
    loading: true,
    success: false,
    error: false,
  });

  const getLoggedIn = () => {
    return loggedIn;
  };

  const updateLoggedIn = (val = false) => {
    setLoggedIn(val);
  };

  const updateUser = (val = {}) => {
    setUser(val);
  };

  useEffect(() => {
    const { userInfo, error, token } = getUserLoggedInUser();
    if (error) {
      setLoggedIn(false);
      setUser({});
      setLoadContent((prev) => {
        return { ...prev, error: false, success: true, loading: false };
      });
    } else if (token) {
      fetchUserFromDb(userInfo._id, token);
    }
  }, []);

  const fetchUserFromDb = async (id, token) => {
    try {
      const res = await getUserByUserById(id, token);
      updateLoggedInUser(res.data);
      setLoggedIn(true);
      setUser(res.data);
      setLoadContent((prev) => {
        return { ...prev, error: false, success: true, loading: false };
      });
    } catch (err) {
      setLoggedIn(false);
      setUser({});
      setLoadContent((prev) => {
        return { ...prev, error: true, success: false, loading: false };
      });
    }
  };

  if (loadContent.loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress disableShrink />
      </div>
    );
  }

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route element={<PrivateRoutes getLoggedIn={getLoggedIn} />}>
            <Route
              index
              element={
                <Home
                  user={user}
                  updateLoggedIn={updateLoggedIn}
                  updateUser={updateUser}
                />
              }
            />
            <Route
              path="/home"
              element={
                <Home
                  user={user}
                  updateLoggedIn={updateLoggedIn}
                  updateUser={updateUser}
                />
              }
            />
          </Route>
          <Route
            path="/login"
            element={
              <Login
                updateLoggedIn={updateLoggedIn}
                updateUser={updateUser}
                getLoggedIn={getLoggedIn}
              />
            }
          />
          <Route
            path="/registration"
            element={<Login getLoggedIn={getLoggedIn} isRegistration />}
          />

          <Route path="/*" element={<h2>404 page</h2>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
