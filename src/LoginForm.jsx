import { useState } from "react";
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
  };

  return (
    <>
      <div className={`mx-auto mt-4 w-80 md:mt-10`}>
        <form onSubmit={handleSubmit}>
          {isNewUser ? (
            <>
              <h1 className="mb-4 text-center text-3xl font-semibold md:text-3xl lg:text-4xl">
                Create An Account
              </h1>
              <div>
                <input
                  className={`mt-4 h-10 w-full rounded-md border bg-slate-50 p-2 text-lg shadow-md focus:border-b-2 focus:outline-none ${errors.name && Object.keys(errors.name).length != 0 ? "border-red-300" : "border-black"} focus:border-blue-300`}
                  name="name"
                  value={formData.name}
                  onChange={handleFormChange}
                  id="name"
                  type="text"
                  placeholder="Full Name"
                />
                <label className="hidden" htmlFor="name">
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
                  className={`mt-4 h-10 w-full rounded-md border bg-slate-50 p-2 text-lg shadow-md focus:border-b-2 focus:outline-none ${errors.email && Object.keys(errors.email).length != 0 ? "border-red-300" : "border-black"} focus:border-blue-300`}
                  name="email"
                  value={formData.email}
                  onChange={handleFormChange}
                  id="email"
                  type="text"
                  placeholder="Email Address"
                />
                <label className="hidden" htmlFor="email">
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
                  className={`mt-4 h-10 w-full rounded-md border bg-slate-50 p-2 text-lg shadow-md focus:border-b-2 focus:outline-none ${errors.streetOne && Object.keys(errors.streetOne).length != 0 ? "border-red-300" : "border-black"} focus:border-blue-300`}
                  name="streetOne"
                  value={formData.address.streetOne}
                  onChange={handleFormChange}
                  type="text"
                  id="street-one"
                  placeholder="Address Line 1"
                />
                <label className="hidden" htmlFor="street-one">
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
                  className={`mt-4 h-10 w-full rounded-md border bg-slate-50 p-2 text-lg shadow-md focus:border-b-2 focus:outline-none ${errors.streetTwo && Object.keys(errors.streetTwo).length != 0 ? "border-red-300" : "border-black"} focus:border-blue-300`}
                  name="streetTwo"
                  value={formData.address.streetTwo}
                  onChange={handleFormChange}
                  type="text"
                  id="street-two"
                  placeholder="Address Line 2"
                />
                <label className="hidden" htmlFor="street-two">
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
              <div className="flex justify-between">
                <div>
                  <input
                    className={`mt-4 h-10 w-56 rounded-md border bg-slate-50 p-2 text-lg shadow-md focus:border-b-2 focus:outline-none ${errors.city && Object.keys(errors.city).length != 0 ? "border-red-300" : "border-black"} focus:border-blue-300`}
                    name="city"
                    value={formData.address.city}
                    onChange={handleFormChange}
                    type="text"
                    id="city"
                    placeholder="City"
                  />
                  <label className="hidden" htmlFor="city">
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
                    className="mt-4 w-20 rounded-md border border-black p-2 shadow-md focus:border-blue-300"
                  >
                    <option value="" className="text-blue-500">
                      --
                    </option>
                    {usStates.map((state, index) => {
                      return (
                        <option key={index} value={state.name}>
                          {state.name}
                        </option>
                      );
                    })}
                  </select>
                  <label className="hidden" htmlFor="state">
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
              </div>
              <div>
                <input
                  className={`mt-4 h-10 w-full rounded-md border bg-slate-50 p-2 text-lg shadow-md focus:border-b-2 focus:outline-none ${errors.zip && Object.keys(errors.zip).length != 0 ? "border-red-300" : "border-black"} focus:border-blue-300`}
                  name="zip"
                  value={formData.address.zip}
                  onChange={handleFormChange}
                  type="text"
                  id="zip"
                  placeholder="ZIP Code"
                />
                <label className="hidden" htmlFor="zip">
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
              className={`mt-4 h-10 w-full rounded-md border bg-slate-50 p-2 text-lg shadow-md focus:border-b-2 focus:outline-none ${errors.username && Object.keys(errors.username).length != 0 ? "border-red-300" : "border-black"} focus:border-blue-300`}
              name="username"
              value={formData.username}
              onChange={handleFormChange}
              type="text"
              id="username"
              placeholder="Username"
            />
            <label className="hidden" htmlFor="username">
              Username
            </label>
            {errors.username ? (
              <p className="-pb-4 text-right text-red-500">
                {errors.username.message}
              </p>
            ) : (
              <></>
            )}
          </div>

          <div>
            <input
              className={`mt-4 h-10 w-full rounded-md border bg-slate-50 p-2 text-lg shadow-md focus:border-b-2 focus:outline-none ${errors.password && Object.keys(errors.password).length != 0 ? "border-red-300" : "border-black"} focus:border-blue-300`}
              name="password"
              value={formData.password}
              onChange={handleFormChange}
              type={isPeeking ? "text" : "password"}
              id="password"
              placeholder="Password"
            />
            <label className="hidden" htmlFor="password">
              Password
            </label>
            {formData.password && (
              <i
                className={`${!isPeeking ? "iconoir-eye" : "iconoir-eye-closed"} absolute ${!isPeeking ? "-translate-x-10 translate-y-5" : "-translate-x-10 translate-y-6"} text-3xl hover:cursor-pointer`}
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
                  className={`mt-4 h-10 w-full rounded-md border bg-slate-50 p-2 text-lg shadow-md focus:border-b-2 focus:outline-none ${errors.reTypePass && Object.keys(errors.reTypePass).length != 0 ? "border-red-300" : "border-black"} focus:border-blue-300`}
                  name="reTypePass"
                  value={formData.reTypePass}
                  onChange={handleFormChange}
                  type={isPeeking ? "text" : "password"}
                  id="re-password"
                  placeholder="Re-Type Password"
                />
                <label className="hidden" htmlFor="re-password">
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
          <div className="flex justify-center">
            <input
              className="mx-auto mb-4 mt-8 rounded-md bg-blue-400 px-8 py-4 text-2xl font-bold text-white shadow-md hover:cursor-pointer hover:shadow-lg active:bg-blue-500"
              type="submit"
              value={isNewUser ? "Create Account" : "Login"}
            />
          </div>
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
