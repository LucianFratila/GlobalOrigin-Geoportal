import React  from 'react'
import PropTypes from 'prop-types'

const CheckBoxCtrl = ({
    name,
    placeholder,
    onChange,
    className,
    classLabel,
    value,
    error,
    checked,
    children,
    label,
    ...props
  }) => {

    const handleChange=(event) => {
      if(value)
        onChange(name,false)
      else  
        onChange(name,true)
    }

    return (
      <div className="form-check pt-3">
          <input
              id={name}
              name={name}
              type="checkbox"
              placeholder={placeholder}
              onChange={handleChange}
              value={value}
              checked={checked}
              className={ error ? className + " is-invalid" : className}
          />
          <label  htmlFor={name}  className={classLabel + " znt-form-label"}>{label}</label>
          <div className="valid-feedback"></div>
          <div className="invalid-feedback">{ error && <p>{ error }</p>}</div>
      </div>
    )
  }
  
  CheckBoxCtrl.defaultProps = {
    type: "text",
    className: "",
    placeholder:""
  }
  
  CheckBoxCtrl.propTypes = {
    name: PropTypes.string.isRequired,
    type: PropTypes.string,
    placeholder: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['text', 'number', 'password']),
    className: PropTypes.string,
    value: PropTypes.any,
    onChange: PropTypes.func.isRequired
  }

  export default CheckBoxCtrl