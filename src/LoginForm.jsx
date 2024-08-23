import { useState, useEffect } from "react";
import states from "states-us";
import useFormValidation from "./utils/validateHook";

// remove "debounce" and "use-debounce" packages
import useDebounce from "react-debounced";
const usStates = states.filter((entry) => entry.contiguous);

function LoginForm() {
  const [isNewUser, setIsNewUser] = useState(false);
  const [errors, setErrors] = useState({});
  const [isPeeking, setIsPeeking] = useState(false);
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

  const validate = useFormValidation(formData, errors, setErrors);
  const debounce = useDebounce(600);

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

  return (
    <>
      <div className={`mx-auto mt-4 w-80 md:mt-10`}>
        <form onSubmit={handleSubmit}>
          {isNewUser ? (
            <>
              <h1 className="mb-8 text-center text-3xl font-semibold md:text-3xl lg:text-4xl">
                Create An Account
              </h1>
              <div>
                <input
                  className={`mt-2 w-full border-b bg-transparent text-xl focus:border-b-2 focus:outline-none ${errors.name ? "border-red-300" : "border-black"}`}
                  name="name"
                  value={formData.name}
                  onChange={handleFormChange}
                  id="name"
                  type="text"
                />
                <label className="" htmlFor="name">
                  Full Name
                </label>
                {errors.name ? (
                  <p className="text-right text-red-500">
                    {errors.name.message}
                  </p>
                ) : (
                  <></>
                )}
              </div>
              <div>
                <input
                  className={`mt-2 w-full border-b bg-transparent text-xl focus:border-b-2 focus:outline-none ${errors.email ? "border-red-300" : "border-black"}`}
                  name="email"
                  value={formData.email}
                  onChange={handleFormChange}
                  id="email"
                  type="text"
                />
                <label className="" htmlFor="email">
                  Email Address
                </label>
                {errors.email ? (
                  <p className="text-right text-red-500">
                    {errors.email.message}
                  </p>
                ) : (
                  <></>
                )}
              </div>
              <div>
                <input
                  className={`mt-2 w-full border-b bg-transparent text-xl focus:border-b-2 focus:outline-none ${errors.email ? "border-red-300" : "border-black"}`}
                  name="streetOne"
                  value={formData.address.streetOne}
                  onChange={handleFormChange}
                  type="text"
                  id="street-one"
                />
                <label className="" htmlFor="street-one">
                  Address Line 1
                </label>
                {errors.streetOne ? (
                  <p className="text-right text-red-500">
                    {errors.streetOne.message}
                  </p>
                ) : (
                  <></>
                )}
              </div>
              <div>
                <input
                  className={`mt-2 w-full border-b bg-transparent text-xl focus:border-b-2 focus:outline-none ${errors.email ? "border-red-300" : "border-black"}`}
                  name="streetTwo"
                  value={formData.address.streetTwo}
                  onChange={handleFormChange}
                  type="text"
                  id="street-two"
                />
                <label className="" htmlFor="street-two">
                  Address Line 2
                </label>
                {errors.streetTwo ? (
                  <p className="text-right text-red-500">
                    {errors.streetTwo.message}
                  </p>
                ) : (
                  <></>
                )}
              </div>
              <div>
                <input
                  className={`mt-2 w-full border-b bg-transparent text-xl focus:border-b-2 focus:outline-none ${errors.email ? "border-red-300" : "border-black"}`}
                  name="city"
                  value={formData.address.city}
                  onChange={handleFormChange}
                  type="text"
                  id="city"
                />
                <label className="" htmlFor="city">
                  City
                </label>
                {errors.city ? (
                  <p className="text-right text-red-500">
                    {errors.city.message}
                  </p>
                ) : (
                  <></>
                )}
              </div>
              <div>
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
                <label className="" htmlFor="state">
                  State
                </label>
                {errors.state ? (
                  <p className="text-right text-red-500">
                    {errors.state.message}
                  </p>
                ) : (
                  <></>
                )}
              </div>
              <div>
                <input
                  className={`mt-2 w-full border-b bg-transparent text-xl focus:border-b-2 focus:outline-none ${errors.email ? "border-red-300" : "border-black"}`}
                  name="zip"
                  value={formData.address.zip}
                  onChange={handleFormChange}
                  type="text"
                  id="zip"
                />
                <label className="" htmlFor="zip">
                  Zip
                </label>
                {errors.zip ? (
                  <p className="text-right text-red-500">
                    {errors.zip.message}
                  </p>
                ) : (
                  <></>
                )}
              </div>
            </>
          ) : (
            <>
              <h1 className="text-center text-3xl font-semibold md:text-3xl lg:text-4xl">
                Login
              </h1>
            </>
          )}
          <div>
            <input
              className={`mt-4 w-full border-b bg-transparent text-xl focus:border-b-2 focus:outline-none ${errors.email ? "border-red-300" : "border-black"}`}
              name="username"
              value={formData.username}
              onChange={handleFormChange}
              type="text"
              id="username"
            />
            <label className="" htmlFor="username">
              Username
            </label>
            {errors.username ? (
              <p className="text-right text-red-500">
                {errors.username.message}
              </p>
            ) : (
              <></>
            )}
          </div>

          <div>
            <input
              className={`mt-4 w-full border-b bg-transparent text-xl focus:border-b-2 focus:outline-none ${errors.email ? "border-red-300" : "border-black"}`}
              name="password"
              value={formData.password}
              onChange={handleFormChange}
              type={isPeeking ? "text" : "password"}
              id="password"
            />
            <label className="" htmlFor="password">
              Password
            </label>
            {formData.password && (
              <i
                className={`iconoir-eye ${isPeeking && "bg-slate-400"} hover:cursor-pointer`}
                onClick={() => setIsPeeking((prev) => !prev)}
              ></i>
            )}
            {errors.password ? (
              <p className="text-right text-red-500">
                {errors.password.message}
              </p>
            ) : (
              <></>
            )}
          </div>

          {isNewUser ? (
            <>
              <div>
                <input
                  className={`mt-2 w-full border-b bg-transparent text-xl focus:border-b-2 focus:outline-none ${errors.email ? "border-red-300" : "border-black"}`}
                  name="reTypePass"
                  value={formData.reTypePass}
                  onChange={handleFormChange}
                  type={isPeeking ? "text" : "password"}
                  id="re-password"
                />
                <label className="" htmlFor="re-password">
                  Re-Type Password
                </label>
                {errors.reTypePass ? (
                  <p className="text-right text-red-500">
                    {errors.reTypePass.message}
                  </p>
                ) : (
                  <></>
                )}
              </div>
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
