import React, {useState, useEffect}  from 'react';
import {useParams} from "react-router-dom";
import axios from 'axios';
import Select from 'react-select';
import { useNavigate } from "react-router-dom";
import DoctorNavbar from '../DoctorNavbar'


const patients = require('../../database/patients.json');




const MakeAppointmentByDoctor = () => {

  let navigate = useNavigate(); 
    let{date, hour} = useParams(); 

    const patientOptions = [];

    const patientsData = JSON.parse(JSON.stringify(patients));
        for (let patient of patientsData){ //important the difference between and in in 
            const option = { value: `${patient.id}`, label: `${patient.firstName} ${patient.lastName} ${patient.Bdate}`}
            patientOptions.push(option);
        
      } 


    const [formValues, setFormValues] = useState({
        patientID: '',

    });


    
    const [backendData, setBackendData] = useState({})


    useEffect(() => {
      axios.get('/doctorDashboard').then(function (response) {
      setBackendData(response.data)
      console.log(backendData)
    })}, [])

    const handleSelectedPatient = (selectedOptions) => {
      const selectedValue = selectedOptions.value;
      setFormValues({ patientID : `${selectedValue}`, });
    };


    let dateObj = new Date(date);
    
    const handleSubmit = async (e) => {
        e.preventDefault(); 

        try{
          const response = await axios.post(`/makeappointmentbydoctor/${dateObj}/${hour}`, formValues);

          console.log(dateObj);
          console.log(response.data);
          if(response.status === 200){
            console.log('successful')
            navigate('/docschedule');
          } else {
            console.error('There was an error with your signup')
          }
        }
        catch (err){
          console.error(err);
        }
    
      };

        return(
            <div>
              {(typeof backendData.data === 'undefined') ? (
                  <div className='loading'>
                    <img src={require("../../Styles/img/loading.gif")} alt="" width="300px"/> 
                  </div>
              ) : (
                <div >
                <DoctorNavbar name= {backendData.data.firstName + backendData.data.lastName} id={backendData.data.id} url={backendData.data.ava_url} />
                  <div className='container'>
                  <div className="makeAppt">
                    <h1 >Add appointment </h1> 
                    <h2> {dateObj.getMonth() + 1}/{dateObj.getDate()}/{dateObj.getFullYear()} at {hour} </h2>
                    <form onSubmit={handleSubmit}>
                      <label>Choose a patient</label><br/>
                        <Select options={patientOptions} onChange={handleSelectedPatient} required/><br/>
                      <button type="submit" className='btn btn-success'>Submit</button>
                    </form>
                  </div>
                  </div>
                </div>
              )}
          </div>

        )
}

export default MakeAppointmentByDoctor;