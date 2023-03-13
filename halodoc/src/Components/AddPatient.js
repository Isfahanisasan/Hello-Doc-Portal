import React, { useState } from 'react';
import DoctorNavbar from "./DoctorNavbar"
import './../Styles/Styles.AddPatient.scss'
const AddPatient = () => {

    const [formValues, setFormValues] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        Bdate: '',
        gender: ''
    });

    const handleInputChange = (e) => {
        console.log(e.target.name)
        console.log(e.target.value)
    }

    return(
        <div className="AddPatient">
            <DoctorNavbar/>
            <div className="container">
               
                <img src={require('../Styles/img/add-user.png')}/>
                <h1> Add new patient </h1>
                
                
                <div className="row">
                    <label> Name </label><br/>
                    <div className="col">
                        <input type='text' placeholder="First Name" name='firstName' onChange={handleInputChange} required/>
                    </div>
                    <div className="col">
                        <input type='text' placeholder="Last Name" name='lastName' onChange={handleInputChange} required/>
                    </div>
                </div>
                <div className="row">
                    
                    <div className="col">
                        <label> Date of birth  </label><br/>
                        <input type='date' name='Bdate' onChange={handleInputChange} required/>
                    </div>
                    <div className="col">
                        <label> Gender  </label><br/>
                        <select id="gender" name="gender" onChange={handleInputChange} required>
                            <option value="">Select Gender</option>
                            <option value="female">female</option>
                            <option value="male">male</option>
                            <option value="Other">Other</option>
                        </select><br />
                    </div>
                    
                </div>

                <div className="row">
                    <label> Contact </label><br/>
                    <div className="col">
                        <input type='email' placeholder="Email"  name='email' onChange={handleInputChange} required/>
                    </div>
                    <div className="col">
                        <input type='text' placeholder="Phone number"  name='phoneNumber' onChange={handleInputChange} required/>
                    </div>
                </div>
                <br/>
                <button type='submit' className="btn btn-success"> Add this patient </button>
                
                
                
            </div>
        </div>
    )
}

export default AddPatient