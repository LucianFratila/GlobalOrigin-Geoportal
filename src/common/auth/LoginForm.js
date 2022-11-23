import React , { useState } from 'react'
import axios from 'axios'
import InputCtrl from '../controls/InputCtrl.js'
import ButtonCtrl from '../controls/ButtonCtrl.js'
//import Translate from '../languages/Translate.js'
import { Link } from 'react-router-dom'

function LoginForm({resetUser}){

    const defFields={"email":'',"password":""}
    const defErrors={"email":'',"password":""}

    const [fields,setFields]=useState(defFields)
    const [errors,setErrors]=useState(defErrors)

    const [message,setMessage]=useState('')
    const [messageClass,setMessageClass]=useState('')

    const handleChange = (field,value)=>{
        let fieldsChanged={...fields}
        fieldsChanged[field]=value
        setFields(fieldsChanged)
        
        if(errors[field]){
          let errorsChanged={...errors}
          errorsChanged[field]=''
          setErrors(errorsChanged)
        }
    }
  
    const handleSubmit = (event) => {
      event.preventDefault();  

      const data = new FormData(event.currentTarget)
      const values = Object.fromEntries(data.entries())

      setMessage("Loading...")
      
      axios.post('/authentication/login',values)
          .then( response => {
            console.log(response);
                setMessage(response.data.output.message)
                setMessageClass('alert alert-success')    
                resetUser(fields["email"],response.data.output.jwt);             
            })
            .catch( error => {
                setMessageClass('alert alert-danger')
                if(error.response.data.output.errors){
                    setMessage('Please correct the errors')
                    setErrors(error.response.data.output.errors)
                }
                else{
                    setMessage(error.response.data.output.message)
                    setErrors(defErrors)
                } 
            })
    }
  
      return (
        <React.Fragment>
          <div className='container text-center pt-5'>
              <div className="card mx-auto mb-5" style={{width:'500px'}} >
                <h5 className="card-header success-color white-text text-center py-4">
                  <strong>Sign in</strong>
                </h5>
                <div className="card-body px-lg-5">
                  <form onSubmit={handleSubmit} >
                            <InputCtrl
                                label="Email"
                                name="email"
                                type="text"
                                value={fields["email"]}
                                onChange={handleChange}
                                placeholder=''
                                error={errors.email}
                                className=""
                            />
                            <InputCtrl
                                label="Password"
                                name="password"
                                type="password"
                                value={fields["password"]}
                                onChange={handleChange}
                                placeholder=''
                                error={errors.password}
                                className=""
                            />
                            <div className="d-flex justify-content-between">
                              <div className="form-check">
                                <input type="checkbox" className="form-check-input" id="rememberMe" name="rememberMe" value=''/>
                                <label className="form-check-label" htmlFor="rememberMe">Remember me</label>
                              </div>
                              <div>
                                <Link  className="text-success" to="/forgot">Forgot password?</Link>
                              </div>
                            </div>
                            <ButtonCtrl
                                type="submit"
                                label="Submit"
                                className="btn btn-outline-success btn-rounded btn-block my-4 waves-effect z-depth-0"
                            />
                            <p>Not a member? 
                              <Link className="text-success" to="/register">Register</Link>
                            </p>
                        </form>
                        <div className={messageClass}>{message}</div>
                    </div>   
                </div>
            </div>             
        </React.Fragment>
      );
  }

  export default LoginForm