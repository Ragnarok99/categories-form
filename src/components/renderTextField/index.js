import React from "react";
import { TextField } from "redux-form-material-ui";

const RenderTextField = field => {
  let { meta: { touched, error } } = field;

  return (
    <TextField
      hintText={`Some ${field.label} here.`}
      floatingLabelText={field.label}
      errorText={touched && error}
      fullWidth={true}
      value={field.input.value || ""}
      {...field}
    />
  );
};

export default RenderTextField;
