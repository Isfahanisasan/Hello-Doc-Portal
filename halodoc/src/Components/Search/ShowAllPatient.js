import React, {useState, useEffect}  from 'react';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../Styles/Styles.DoctorDashboard.scss'
import DoctorNavbar from './DoctorNavbar'

const ShowAllPatient = () => {
    let navigate = useNavigate();
    const [backendData, setBackendData] = useState({})

    useEffect(() => {
      axios.get('/showAllPatient').then(function (response) {
      setBackendData(response.data)
      console.log(backendData)
    })}, [])

    return(
        <div>
            {(typeof backendData.data === 'undefined') ? (
                <div className='loading'>
                  <img src={require("../Styles/img/loading.gif")} alt="" width="300px"/> 
                </div>
            ) : (
              
              <div className='DoctorDashboard' >
                <DoctorNavbar name= {backendData.data.firstName + backendData.data.lastName} id={backendData.data.id} url={backendData.data.ava_url} />
                <div className='container'>
                  <div className='row'>
                    <div className='col-lg-2'>
                     
                    </div>
                    <div className='col-lg-8'>

                        {/* Today appointment */}
                        <div className='TodayAppointment'>
                          <h2> Today's appointment </h2>
                          <div className='container'>

                            <div className="card header">
                              <div className="card-body">
                                <div className='row'> 
                                  <div className='col-sm-3'> Patient name </div>
                                  <div className='col-sm-2'> Start time </div>
                                  <div className='col-sm-4'> Patient email </div>
                                  <div className='col-sm-3'> Patient birthday</div>
                                </div>
                              </div>
                            </div>
                        
                            {backendData.appointment
                              .sort((a, b) => a.startTime > b.startTime ? 1 : -1)
                              .map(appt => (
                              <div className="card">
                                <div className="card-body">
                                  <div className='row'> 
                                    <div className='col-sm-3'> {appt.patientName} </div>
                                    <div className='col-sm-2'> {appt.startTime} </div>
                                    <div className='col-sm-4'> {appt.patientEmail}</div>
                                    <div className='col-sm-3'> {appt.patientBirthday}</div>
                                  </div>
                                  
                                </div>
                              </div>
                            ))}
                    
                        </div>
                        </div>
                    </div>                    
                    <div className='col-lg-2'> 
                      
                    </div>
                  </div>
                </div>
              </div>  
            )}
        </div>
    )
}

export default DoctorDashboard