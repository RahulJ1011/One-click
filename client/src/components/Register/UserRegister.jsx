import React, { useState } from 'react'
import './Register.css'
const UserRegister = () => {
  const [data,SetData] = useState({
    FirstName:"",
    LastName:"",
    Email:"",
    Password:"",
    Mobile:0
  })
  const [show,setShow] = useState(false)
  return (
    <div className='register-container'>
      <div className='register-box'>
          <div className='inputs'>
           <div className='names'>
            <label>
              FirstName
            </label>
            <input 
            className='reg-firstName'
            type='text'
            name='FirstName'
            placeholder='Enter the FirstName'
            required
            />
           </div>
            <input 
            className='reg-lastName'
            type='text'
            name='LastName'
            placeholder='Enter the LastName'
            required
            />
                <input 
                className="reg-password"
                type={show ? "text" : "password"}
                name="Password"
                placeholder="Enter the Password"
                required
              />
           <input 
                className="reg-confirmPassword"
                type={show ? "text" : "password"}
                name="ConfirmPassword"
                placeholder="Enter Password again"
                required
              />
               <input 
                className="reg-mobile"
                type='number'
                name="Mobile"
                placeholder="Enter Your mobile number"
                required
              />

          </div>
      </div>
    </div>
  )
}

export default UserRegister
