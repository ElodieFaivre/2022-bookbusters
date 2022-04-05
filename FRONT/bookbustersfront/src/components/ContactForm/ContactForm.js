import React from 'react'
import { Button, TextField } from "@mui/material";
import { useFormControls } from './FormControls';

const inputFieldValues = [
    {
      name: "fullName",
      label: "Full Name",
      id: "my-name"
    },
    {
      name: "email",
      label: "Email",
      id: "my-email"
    },
    {
      name: "message",
      label: "Message",
      id: "my-message",
      multiline: true,
      rows: 10
    }
  ];

function ContactForm() {
    const {
        handleInputValue,
        handleFormSubmit,
        formIsValid,
        errors
      } = useFormControls();
  return (
    <form onSubmit={handleFormSubmit}>
      {inputFieldValues.map((inputFieldValue, index) => {
        return (
          <TextField
            key={index}
            onBlur={handleInputValue}
        onChange={handleInputValue}
            name={inputFieldValue.name}
            label={inputFieldValue.label}
            multiline={inputFieldValue.multiline ?? false}
            rows={inputFieldValue.rows ?? 1}
        autoComplete="none"
        {...(errors[inputFieldValue.name] && { error: true, helperText: errors[inputFieldValue.name] })}

          />
        );
      })}
      <Button
        type="submit"
        disabled={!formIsValid()}
      >
        Send Message
      </Button>
    </form>
  )
}

export default ContactForm
