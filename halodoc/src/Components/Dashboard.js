import React, {useState, useEffect} from 'react';
import Navbar from './Navbar';
import PatientUpcomingAppt from './Appointments/PatientUpcomingAppt';
import doctorsJson from '../database/doctors.json'
import { useNavigate } from "react-router-dom";
import axios from 'axios';



const Dashboard = () => {
    const navigate = useNavigate();    
    const doctors = JSON.parse(JSON.stringify(doctorsJson));
    const [backendData, setBackendData] = useState({})

  
    useEffect(() => {
      axios.get('/dashboard').then((response) => {
      setBackendData(response.data)
    })})


    return(
      
        <div>
            {(typeof backendData.data === 'undefined') ? (
                <div style={{textAlign: "center"}}>
                  <Navbar/>
                  <h2> Please try logging in again</h2> <br/>
                  <img src={require("../Styles/img/loading.gif")} alt="" width="300px"/> 
                </div>
            ) : (
              <div>
                <img src={(`https://xsgames.co/randomusers/assets/avatars/${backendData.data}/${backendData.data.id}.jpg?w=50`)}></img>
                
                <Navbar name={backendData.data.firstName + ' ' + backendData.data.lastName} email={backendData.data.email}/>
                <PatientUpcomingAppt patientId={backendData.data.id} />
                <p> Find doctors </p>
                <input type="text"/>
                <button> Find </button>
                
                {doctors.map(function(item, i){
                  return (
                    <div>
                      <h2 onClick={() => navigate(`/doctors/${item?.id}`)}> {item.firstName} </h2>
                    </div>
                  )
                })}

              </div>  
            )}
        </div>
    )
}

export default Dashboard