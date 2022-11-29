import React from "react";
//import Translate from '../languages/Translate.js'

function InputCtrl(props) {
  const handleChange = (event) => {
    event.preventDefault();
    props.onChange(props.name, event.target.value);
  };

  return (
    <React.Fragment>
      {/* {props.label ? <label  htmlFor={props.name}  className={props.classLabel}>{props.label}</label> : ''} */}
      <input
        id={props.name}
        name={props.name}
        type={props.type}
        placeholder={props.placeholder}
        onChange={handleChange}
        value={props.value}
        className={`className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'`}
        // className={ props.error ? "form-control is-invalid" : "form-control"}
      />
      <div className='valid-feedback'></div>
      <div className='invalid-feedback'>{props.error}</div>
    </React.Fragment>
  );
}
export default InputCtrl;
