import React , { useState } from 'react'
import axios from 'axios'
import InputCtrl from '../controls/InputCtrl.js'
import ButtonCtrl from '../controls/ButtonCtrl.js'
//import Translate from '../languages/Translate.js'


function RegisterForm({resetUser}){

    const [fields,setFields]=useState({})
    const [errors,setErrors]=useState({})

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
      
      axios.post('/authentication/register',values)
          .then( response => {
                setMessage(response.data.output.message)
                setMessageClass('alert alert-success')          
            })
            .catch( error => {
                setMessageClass('alert alert-danger')
                if(error.response.data.output.errors){
                    setMessage('Please correct the errors')
                    setErrors(error.response.data.output.errors)
                }
                else{
                    setMessage(error.response.data.output.message)
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
                                label="Name"
                                name="name"
                                type="text"
                                value={fields.name}
                                onChange={handleChange}
                                placeholder=''
                                error={errors.name}
                                required
                                className="form-control"
                            />

                            <InputCtrl
                                label="Email"
                                name="email"
                                type="text"
                                value={fields.email}
                                onChange={handleChange}
                                placeholder=''
                                error={errors.email}
                                required
                                className="form-control"
                            />

                            <InputCtrl
                                label="Password"
                                name="password"
                                type="password"
                                value={fields.password}
                                onChange={handleChange}
                                placeholder=''
                                error={errors.password}
                                className="form-control"
                                required
                            />

                            <InputCtrl
                                label="Confirm password"
                                name="password2"
                                type="password"
                                value={fields.password2}
                                onChange={handleChange}
                                placeholder=''
                                error={errors.password2}
                                className="form-control"
                                required
                            />
                            <ButtonCtrl
                                type="submit"
                                label="Submit"
                                className="btn btn-outline-success btn-rounded btn-block my-4 waves-effect z-depth-0"
                            />
                    </form>
                    <div className={messageClass}>{message}</div>
                    </div>   
                </div>
            </div>             
        </React.Fragment>
      );
  }

  export default RegisterForm