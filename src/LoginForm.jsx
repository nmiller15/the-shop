import { useState, useEffect } from "react";
import states from "states-us";
import validator from "validator";
// remove "debounce" and "use-debounce" packages
import useDebounce from "react-debounced";
const usStates = states.filter((entry) => entry.contiguous);

function LoginForm() {
  const [isNewUser, setIsNewUser] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: {
      streetOne: "",
      streetTwo: "",
      city: "",
      state: "",
      zip: "",
    },
    username: "",
    password: "",
    reTypePass: "",
  });
  const [errors, setErrors] = useState({});
  const [isPeeking, setIsPeeking] = useState(false);

  const debounce = useDebounce(600);

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

  const handleFormChange = (e) => {
    if (
      e.target.name == "streetOne" ||
      e.target.name == "streetTwo" ||
      e.target.name == "city" ||
      e.target.name == "state" ||
      e.target.name == "zip"
    ) {
      setFormData((prev) => {
        return {
          ...prev,
          address: {
            ...prev.address,
            [e.target.name]: e.target.value,
          },
        };
      });
      debounce(() => {
        validate("streetOne", {
          ...formData.address,
          [e.target.name]: e.target.value,
        });
        validate("streetTwo", {
          ...formData.address,
          [e.target.name]: e.target.value,
        });
        validate("city", {
          ...formData.address,
          [e.target.name]: e.target.value,
        });
        validate("state", {
          ...formData.address,
          [e.target.name]: e.target.value,
        });
        validate("zip", {
          ...formData.address,
          [e.target.name]: e.target.value,
        });
      });
    } else {
      setFormData((prev) => {
        return {
          ...prev,
          [e.target.name]: e.target.value,
        };
      });
      debounce(() => {
        validate(e.target.name, e.target.value);
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    //TODO: Add logic to send the form data object
  };

  useEffect(() => {
    console.log(errors);
  }, [errors]);

  return (
    <>
      <div
        className={`mx-auto mt-32 w-80 ${isNewUser ? "bg-blue-300" : "bg-slate-400"}`}
      >
        <form onSubmit={handleSubmit}>
          {isNewUser ? (
            <>
              <h1 className="text-center text-3xl font-semibold md:text-3xl lg:text-4xl">
                Create An Account
              </h1>

              <input
                name="name"
                value={formData.name}
                onChange={handleFormChange}
                id="name"
                type="text"
              />
              <label htmlFor="name">Full Name</label>
              {errors.name ? (
                <p className="text-pink-500">{errors.name.message}</p>
              ) : (
                <></>
              )}

              <input
                name="email"
                value={formData.email}
                onChange={handleFormChange}
                id="email"
                type="text"
              />
              <label htmlFor="email">Email Address</label>
              {errors.email ? (
                <p className="text-pink-500">{errors.email.message}</p>
              ) : (
                <></>
              )}

              <input
                name="streetOne"
                value={formData.address.streetOne}
                onChange={handleFormChange}
                type="text"
                id="street-one"
              />
              <label htmlFor="street-one">Address Line 1</label>
              {errors.streetOne ? (
                <p className="text-pink-500">{errors.streetOne.message}</p>
              ) : (
                <></>
              )}

              <input
                name="streetTwo"
                value={formData.address.streetTwo}
                onChange={handleFormChange}
                type="text"
                id="street-two"
              />
              <label htmlFor="street-two">Address Line 2</label>
              {errors.streetTwo ? (
                <p className="text-pink-500">{errors.streetTwo.message}</p>
              ) : (
                <></>
              )}

              <input
                name="city"
                value={formData.address.city}
                onChange={handleFormChange}
                type="text"
                id="city"
              />
              <label htmlFor="city">City</label>
              {errors.city ? (
                <p className="text-pink-500">{errors.city.message}</p>
              ) : (
                <></>
              )}

              <select
                name="state"
                value={formData.address.state}
                onChange={handleFormChange}
                id="state"
              >
                <option value=""></option>
                {usStates.map((state, index) => {
                  return (
                    <option key={index} value={state.name}>
                      {state.name}
                    </option>
                  );
                })}
              </select>
              <label htmlFor="state">State</label>
              {errors.state ? (
                <p className="text-pink-500">{errors.state.message}</p>
              ) : (
                <></>
              )}

              <input
                name="zip"
                value={formData.address.zip}
                onChange={handleFormChange}
                type="text"
                id="zip"
              />
              <label htmlFor="zip">Zip</label>
              {errors.zip ? (
                <p className="text-pink-500">{errors.zip.message}</p>
              ) : (
                <></>
              )}
            </>
          ) : (
            <>
              <h1 className="text-center text-3xl font-semibold md:text-3xl lg:text-4xl">
                Login
              </h1>
            </>
          )}

          <input
            name="username"
            value={formData.username}
            onChange={handleFormChange}
            type="text"
            id="username"
          />
          <label htmlFor="username">Username</label>
          {errors.username ? (
            <p className="text-pink-500">{errors.username.message}</p>
          ) : (
            <></>
          )}

          <input
            name="password"
            value={formData.password}
            onChange={handleFormChange}
            type={isPeeking ? "text" : "password"}
            id="password"
          />
          <label htmlFor="password">Password</label>
          {formData.password && (
            <i
              className={`iconoir-eye ${isPeeking && "bg-slate-400"} hover:cursor-pointer`}
              onClick={() => setIsPeeking((prev) => !prev)}
            ></i>
          )}
          {errors.password ? (
            <p className="text-pink-500">{errors.password.message}</p>
          ) : (
            <></>
          )}

          {isNewUser ? (
            <>
              <input
                name="reTypePass"
                value={formData.reTypePass}
                onChange={handleFormChange}
                className="peer"
                type={isPeeking ? "text" : "password"}
                id="re-password"
              />
              <label htmlFor="re-password">Re-Type Password</label>
              {errors.reTypePass ? (
                <p className="text-pink-500">{errors.reTypePass.message}</p>
              ) : (
                <></>
              )}
            </>
          ) : (
            <></>
          )}
          <input type="submit" />
        </form>
      </div>
      {isNewUser ? (
        <p
          className="text-center text-slate-600 underline hover:cursor-pointer hover:text-black"
          onClick={() => setIsNewUser(false)}
        >
          Already have an account?
        </p>
      ) : (
        <p
          className="text-center text-slate-600 underline hover:cursor-pointer hover:text-black"
          onClick={() => setIsNewUser(true)}
        >
          Create an Account
        </p>
      )}
    </>
  );
}

export default LoginForm;
