import validator from "validator";
// @params (
//   required - formData: { useState controlled data from a form },
//   required - errors: { useState controlled object for errors },
//   required - errors: { useState setter function for errors object }
// )
export default function useFormValidation(formData, errors, setErrors) {
  const addError = (field, type, message) => {
    setErrors((prev) => {
      return {
        ...prev,
        [field]: {
          type,
          message,
        },
      };
    });
  };

  const clearErrors = (field) => {
    if (field === "all") {
      setErrors({});
    } else {
      setErrors((prev) => {
        return {
          ...prev,
          [field]: {},
        };
      });
    }
  };

  const validateName = (name) => {
    clearErrors("name");
    if (validator.isEmpty(name)) addError("name", "required", "Enter a name.");

    return errors.name == null;
  };

  const validateEmail = (email) => {
    clearErrors("email");
    if (!validator.isEmail(email))
      addError("email", "invalid", "Enter a valid email.");
    if (validator.isEmpty(email))
      addError("email", "required", "Enter an email.");

    return errors.email == null;
  };

  const validateAddressStreetOne = (address) => {
    clearErrors("streetOne");
    if (
      !validator.isEmpty(address.streetTwo) ||
      !validator.isEmpty(address.city) ||
      !validator.isEmpty(address.state) ||
      !validator.isEmpty(address.zip)
    ) {
      addError("streetOne", "required", "Enter a street address.");
    }

    return errors.streetOne == null;
  };

  const validateAddressStreetTwo = (address) => {
    clearErrors("streetTwo");
    if (
      validator.isEmpty(address.streetOne) &&
      !validator.isEmpty(address.streetTwo)
    ) {
      addError(
        "streetTwo",
        "invalid",
        "Street address should be entered on line 1.",
      );
    }

    return errors.streetTwo == null;
  };

  const validateAddressCity = (address) => {
    clearErrors("city");
    if (
      !validator.isEmpty(address.streetOne) ||
      !validator.isEmpty(address.state) ||
      !validator.isEmpty(address.zip)
    ) {
      if (validator.isEmpty(address.city))
        addError("city", "required", "Enter a city.");
    }

    return errors.city == null;
  };

  const validateAddressState = (address) => {
    clearErrors("state");
    if (
      !validator.isEmpty(address.streetOne) ||
      !validator.isEmpty(address.city) ||
      !validator.isEmpty(address.zip)
    ) {
      if (validator.isEmpty(address.state))
        addError("state", "required", "Enter a state.");
    }

    return errors.state == null;
  };

  const validateAddressZip = (address) => {
    clearErrors("zip");
    if (
      !validator.isEmpty(address.streetOne) ||
      !validator.isEmpty(address.city) ||
      !validator.isEmpty(address.state)
    ) {
      if (!validator.isNumeric(address.zip))
        addError("zip", "invalid", "Enter a valid ZIP Code.");
      if (address.zip.length !== 5)
        addError("zip", "invalid", "Zip code should be 5 digits.");
      if (validator.isEmpty(address.zip))
        addError("zip", "required", "Enter a valid zip code.");
    }

    return errors.zip == null;
  };

  const validateUsername = (username) => {
    clearErrors("username");
    if (validator.isEmpty(username))
      addError("username", "required", "Enter a username.");
    if (username.length < 4)
      addError(
        "username",
        "invalid",
        "Username must be at least 4 characters.",
      );
    if (validator.contains(username, " "))
      addError("username", "invalid", "Username cannot contain spaces.");
    return errors.username == null;
  };

  const validatePassword = (password) => {
    clearErrors("password");
    if (validator.isEmpty(password))
      addError("password", "required", "Enter a username.");
    if (password.length < 8)
      addError(
        "password",
        "invalid",
        "Password must be at least 8 characters.",
      );
    if (validator.contains(password, " "))
      addError("password", "invalid", "Password cannot contain spaces.");

    return errors.password == null;
  };

  const validateReTypePass = (reTypePass) => {
    clearErrors("reTypePass");
    if (validator.isEmpty(reTypePass))
      addError("reTypePass", "required", "Re-enter your password.");
    if (reTypePass !== formData.password)
      addError("reTypePass", "match", "Passwords do not match.");

    return errors.reTypePass == null;
  };

  const validate = (field, value) => {
    switch (field) {
      case "name":
        return validateName(value);
      case "email":
        return validateEmail(value);
      case "streetOne":
        return validateAddressStreetOne(value);
      case "streetTwo":
        return validateAddressStreetTwo(value);
      case "city":
        return validateAddressCity(value);
      case "state":
        return validateAddressState(value);
      case "zip":
        return validateAddressZip(value);
      case "username":
        return validateUsername(value);
      case "password":
        return validatePassword(value);
      case "reTypePass":
        return validateReTypePass(value);
      default:
        return null;
    }
  };

  return validate;
}

// Custom validation package --
// Validation functions for each field:
//  @param(string) - value for field
//   returns boolean

// Errors object:
//   Contains a list of errors format > {field, type, message}
//   Errors added through addError and removed through clearErrors

// validate function:
//   @param(field: string, value: string)
//   returns boolean by calling functions above
