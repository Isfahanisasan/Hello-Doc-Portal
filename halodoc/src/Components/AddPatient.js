import React, {useState, useEffect}  from 'react';
import DoctorNavbar from "./DoctorNavbar"
import axios from 'axios';
import { useNavigate } from "react-router-dom";


import './../Styles/Styles.AddPatient.scss'
const AddPatient = () => {
    const navigate = useNavigate()
    const [backendData, setBackendData] = useState({})

    const [formValues, setFormValues] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        Bdate: '',
        gender: ''
    });

    const [submitStatus, setSubmitStatus] = useState('')

    const handleInputChange = (e) => {
  

        const name = e.target.name;
        const value = e.target.value;
 
        setFormValues({
            ...formValues,
            [name]: value
        });

    }

    const handleSubmit = async (e) => {
        e.preventDefault(); 
        try{
            const response = await axios.post('/addNewPatient', formValues);
            if (response.data === "Patient already exist")
                setSubmitStatus(response.data)
            else
                navigate(response.data)
        }
        catch (err){
        console.error(err);
        
        }
    }

    useEffect(() => {
        axios.get('/doctorDashboard').then(function (response) {
        setBackendData(response.data)
        console.log(backendData)
      })}, [])

    return(
        <div className="AddPatient">
            {(typeof backendData.data === 'undefined') ? (
                    <div className='loading'>
                    <img src={require("../Styles/img/loading.gif")} alt="" width="300px"/> 
                    </div>
                ) : (

            <div>
            <DoctorNavbar name= {backendData.data.firstName + backendData.data.lastName} id={backendData.data.id} url={backendData.data.ava_url} />
                <div className="container">
                    <form onSubmit={handleSubmit}>
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
                            <input type='email' placeholder="Email"  name='email' onInput={handleInputChange} required/>
                        </div>
                        <div className="col">
                            <input type='text' placeholder="Phone number"  name='phoneNumber' onInput={handleInputChange} required/>
                        </div>
                    </div>
                    <br/>
                    <button type='submit' className="btn btn-success"> Add this patient </button>
                    <p > {submitStatus} </p>
                    </form>
                    
                    
            </div>
            </div>)}
            
        </div>
    )
}

export default AddPatient