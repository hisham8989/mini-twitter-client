import React from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const CreateTweet = ({ handleSubmit }) => {
  const validationSchema = Yup.object().shape({
    content: Yup.string()
      .required("Content is required")
      .max(280, "Content must be at most 280 characters"),
  });

  return (
    <Box sx={{ marginBottom: 2 }}>
      <Typography variant="h5" sx={{ marginBottom: 2 }}>
        Create Tweet
      </Typography>
      <Formik
        initialValues={{ content: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form>
            <Field name="content">
              {({ field }) => (
                <TextField
                  {...field}
                  multiline
                  rows={4}
                  variant="outlined"
                  label="Tweet Content"
                  fullWidth
                  error={Boolean(field.value && field.error)}
                  helperText={<ErrorMessage name="content" />}
                />
              )}
            </Field>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
            >
              Add Tweet
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default CreateTweet;
