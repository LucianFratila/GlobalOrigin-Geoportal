import React  from 'react'
//import Translate from '../languages/Translate.js'

function InputCtrl(props){

	const handleChange=(event) => {
		event.preventDefault();
		props.onChange(props.name,event.target.value)
	}
	 
    return (
          <React.Fragment>
            {props.label ? <label  htmlFor={props.name}  className={props.classLabel}>{props.label}</label> : ''}
            <input
                id={props.name}
                name={props.name}
                type={props.type}
                placeholder={props.placeholder}
                onChange={handleChange}
                value={props.value}
                className={ props.error ? "form-control is-invalid" : "form-control"}
            /> 
            <div className="valid-feedback"></div>
			<div className="invalid-feedback">{props.error}</div>
          </React.Fragment>  
    )
  }
  export default InputCtrl