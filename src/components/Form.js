import React from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Link,
  Box,
} from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { PASSWORD_REGEX, USERNAME_REGEX } from "../constants";
import {
  createUser,
  destroyToken,
  loginUser,
  saveToken,
} from "../manager/user.manager";
import { useNavigate } from "react-router-dom";

const LoginForm = (props) => {
  let { isRegistration, updateLoggedIn, updateUser } = props;
  const navigate = useNavigate();

  const handleSubmit = (values, actions) => {
    const formValues = {
      username: values.username,
      password: values.password,
    };

    if (isRegistration) {
      registerUser(formValues).then(({ success }) => {
        if (success) {
          actions.setSubmitting(false);
          actions.resetForm();
          navigate("/login");
        }
      });
    } else {
      signInUser(formValues)
        .then((data) => {
          updateLoggedIn(true);
          updateUser(data.userInfo);
          actions.setSubmitting(false);
        })
        .catch((err) => {
          alert(err);
          updateLoggedIn(false);
          updateUser({});
          actions.setSubmitting(false);
        });
    }
  };

  const registerUser = async (user) => {
    try {
      const response = await createUser(user);
      return response;
    } catch (err) {
      console.log("err", err);
    }
  };

  const signInUser = async (user) => {
    try {
      const response = await loginUser(user);
      if (response.success) {
        const { token, user: userInfo } = response;
        saveToken(JSON.stringify({ token, userInfo }));
        return { token, userInfo };
      } else {
        throw response.error;
      }
    } catch (err) {
      destroyToken();
      throw err;
    }
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .required("Username is required")
      .matches(
        USERNAME_REGEX,
        "username must be 3-16 characters and contain only letters, numbers"
      ),
    password: Yup.string()
      .required("Password is required")
      .matches(
        PASSWORD_REGEX,
        'password must be 8-16 characters and contain only letters, numbers, "@" , and underscores'
      ),
  });

  return (
    <Container maxWidth="sm">
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {({ isSubmitting }) => (
          <Form>
            <Typography variant="h4" align="center" gutterBottom>
              {isRegistration ? "Registration" : "Login"}
            </Typography>

            <div>
              <Field
                name="username"
                as={TextField}
                label="Username"
                variant="outlined"
                fullWidth
                margin="normal"
                required
              />
              <Typography
                variant="body2"
                color="error"
                fontSize="0.8rem"
                paddingLeft={2}
              >
                <ErrorMessage name="username" />
              </Typography>
            </div>

            <div>
              <Field
                name="password"
                as={TextField}
                label="Password"
                variant="outlined"
                fullWidth
                margin="normal"
                type="password"
                required
              />
              <Typography
                variant="body2"
                color="error"
                fontSize="0.8rem"
                paddingLeft={2}
              >
                <ErrorMessage name="password" />
              </Typography>
            </div>

            <Box paddingTop={2} display="flex" justifyContent="space-around">
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={isSubmitting}
                sx={{ width: "50%" }}
              >
                {isRegistration ? "Register" : "Login"}
              </Button>

              <Typography
                align="center"
                style={{ marginTop: "1rem", width: "30%" }}
              >
                {isRegistration ? (
                  <Link href="/login">Already have an account? Login</Link>
                ) : (
                  <Link href="/registration">
                    Don't have an account? Register
                  </Link>
                )}
              </Typography>
            </Box>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default LoginForm;
