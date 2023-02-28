import React, {useState, useEffect} from 'react';
// import Navbar from './Navbar';
// import PatientUpcomingAppt from './Appointments/PatientUpcomingAppt';
import doctorsJson from '../../database/doctors.json'
import { useNavigate } from "react-router-dom";
import {useParams} from "react-router-dom";
import axios from 'axios';



const Schedule = () => {
    let { id } = useParams();

    const doctors = JSON.parse(JSON.stringify(doctorsJson));
    const doctor = doctors.find((doctor) => doctor.id === id)

    const [backendData, setBackendData] = useState({})

    axios.get(`/schedule/${id}`)
    .then(({data}) => {
        setBackendData(data)
      })
    
    

    return (
        <div>
            {(typeof backendData.data === 'undefined') ? (
            <div style={{textAlign: "center"}}>
              
              <h2> Please try logging in again</h2> <br/>
              {/* <img src={require("../Styles/img/loading.gif")} alt="" width="300px"/>  */}
            </div>
            ):(
                <div>
                    <h1> Patient {backendData.data.firstName} making appointment with doctor {doctor.firstName} </h1>
                </div>
            )}
        </div>
        




        
    )
}

export default Schedule