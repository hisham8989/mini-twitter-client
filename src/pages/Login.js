import Form from "../components/Form";
import { Navigate } from "react-router-dom";

const Login = ({ getLoggedIn, isRegistration, updateLoggedIn, updateUser }) => {
  return getLoggedIn() ? (
    <Navigate to="/" />
  ) : (
    <Form
      isRegistration={isRegistration}
      updateLoggedIn={updateLoggedIn}
      updateUser={updateUser}
    />
  );
};

export default Login;
