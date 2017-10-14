import React from 'react';
import { TextField } from "redux-form-material-ui";

const RenderTextField = (field) => {

  let { meta: { touched, error } } = field;

    return (
      <TextField
        required={true}
        hintText={`Some ${field.label} here.`}
        floatingLabelText={field.label}
        errorText={touched && error}
        {...field}
      />
    );
  
}

export default RenderTextField;