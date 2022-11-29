import React, { useState } from "react";
import axios from "axios";
import InputCtrl from "../controls/InputCtrl.js";
import ButtonCtrl from "../controls/ButtonCtrl.js";
//import Translate from '../languages/Translate.js'
import { Link } from "react-router-dom";

function LoginForm({ resetUser }) {
  const defFields = { email: "", password: "" };
  const defErrors = { email: "", password: "" };

  const [fields, setFields] = useState(defFields);
  const [errors, setErrors] = useState(defErrors);

  const [message, setMessage] = useState("");
  const [messageClass, setMessageClass] = useState("");

  const handleChange = (field, value) => {
    let fieldsChanged = { ...fields };
    fieldsChanged[field] = value;
    setFields(fieldsChanged);

    if (errors[field]) {
      let errorsChanged = { ...errors };
      errorsChanged[field] = "";
      setErrors(errorsChanged);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const values = Object.fromEntries(data.entries());

    setMessage("Loading...");

    axios
      .post("/users/login", values)
      .then((response) => {
        console.log(response);
        setMessage(response.data.message);
        setMessageClass("alert alert-success");
        resetUser(fields["email"], response.data.jwt, response.data.refresh_token);
      })
      .catch((error) => {
        setMessageClass("alert alert-danger");
        if (error.response && error.response.data && error.response.data.errors) {
          setMessage("Please correct the errors");
          setErrors(error.response.data.errors);
        } else {
          setMessage(error.response.data.message);
          setErrors(defErrors);
        }
      });
  };
  console.log(message);
  return (
    <React.Fragment>
      <section className='mt-4 flex justify-center '>
        <div className='w-full  rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0 bg-primary '>
          <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
            <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white'>
              Sign in to your account
            </h1>
            <form onSubmit={handleSubmit} className='space-y-4 md:space-y-6' action='#'>
              <div>
                <label htmlFor='email' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
                  Your email
                </label>
                <InputCtrl
                  label='Email'
                  name='email'
                  type='text'
                  value={fields["email"]}
                  onChange={handleChange}
                  placeholder=''
                  error={errors.email}
                  className=''
                />
              </div>
              <div>
                <label htmlFor='password' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
                  Password
                </label>
                <InputCtrl
                  label='Password'
                  name='password'
                  type='password'
                  value={fields["password"]}
                  onChange={handleChange}
                  placeholder=''
                  error={errors.password}
                  className=''
                />
              </div>
              <div className='flex items-center justify-between'>
                <div className='flex items-start'>
                  <div className='flex items-center h-5'>
                    <input
                      id='remember'
                      aria-describedby='remember'
                      type='checkbox'
                      className='w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800'
                      required=''
                    />
                  </div>
                  <div className='ml-3 text-sm'>
                    <label htmlFor='remember' className='text-gray-500 dark:text-gray-300'>
                      Remember me
                    </label>
                  </div>
                </div>
                <a href='#' className='text-sm font-medium text-primary-600 hover:underline dark:text-primary-500'>
                  Forgot password?
                </a>
              </div>
              <ButtonCtrl type='submit' label='Submit' />
            </form>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
}

export default LoginForm;
