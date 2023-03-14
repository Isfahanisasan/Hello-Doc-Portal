import React, {useState, useEffect}  from 'react';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../Styles/Styles.ShowAllPatient.scss'
import DoctorNavbar from './DoctorNavbar'

const ShowAllPatient = () => {
    let navigate = useNavigate();
    const [backendData, setBackendData] = useState([])
    const [searchField, setSearchField] = useState("")
    const [backUp, setBackUp] = useState([])

    useEffect(() => {
      axios.get('/showallpatient').then(function (response) {
      console.log(response.data)
      setBackendData(response.data);
      setBackUp(response.data)
    })}, [])

    const handleChange = (e) => {
      const searchContent = e.target.value
      const temp = JSON.parse(JSON.stringify(backUp.patientsdata));
  
      const patients = temp.filter(patient => 
        (patient.firstName+" "+patient.lastName+" "+patient.Bdate).toLowerCase().includes(searchContent.toString().toLowerCase())
      );
      
      const newBackEndData = {
        ...backendData,
        patientsdata: patients
      }
      setBackendData(newBackEndData);
    }
  
    return(
        <div>
            {(typeof backendData.doctordata === 'undefined') ? (
                <div className='loading'>
                  <img src={require("../Styles/img/loading.gif")} alt="" width="300px"/> 
                </div>
            ) : (
              
              <div className='ShowAllPatient' >
                <DoctorNavbar name= {backendData.doctordata.firstName + backendData.doctordata.lastName} id={backendData.doctordata.id} url={backendData.doctordata.ava_url} />
                <div className='container'>
                  <div className='row'>
                    
                    <div>

                        {/* Today appointment */}
                        <div className='TodayAppointment'>
                          
                          <div className='container'>
                            <div className='row'> 
                            <div className='col-lg-10'>
                              <h2> Look up patients' profiles </h2>
                            </div>
                            <div className='col-lg-2'>

                              <button onClick={() => navigate('/addpatient')}> + Add patient </button>
                            </div>
                            </div>
                            <div className="card header"  >
                              <input onChange={handleChange}></input>
                            </div>
                            <div className='gallery-card'>
                              {backendData.patientsdata
                                .map(patient => (
                                <div className="card card-format" style={{width: '18rem'}}>
                                  <div className="card-body">
                                    <div className='row'> 
                                      <p>Name: {patient.firstName} {patient.lastName}</p>
                                      <p>Birthday: {patient.Bdate} </p>
                                      <p>Email: {patient.email} </p>

                                      <div className="dropdown ">
                                          <button className="btn dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                              Upcoming appointments
                                          </button>
                                          
                                          <div className="dropdown-menu dropdown-menu-end dropdown-menu-right" aria-labelledby="dropdownMenuButton">
                                          {backendData.appointment.filter(appointment => appointment.patient_id === patient.id)
                                            .map(appt => (
                                              <div>  {appt.date} {appt.startTime} </div>
                                            ))}
                                          </div>
                                      </div>

                                      
                                    </div>                                 
                                  </div>
                                </div>
                              ))}
                            </div>
                        </div>
                        </div>
                    </div>                    
                  </div>
                </div>
              </div>  
            )}
        </div>
    )
}

export default ShowAllPatient