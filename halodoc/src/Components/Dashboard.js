import React, {useState, useEffect} from 'react';
import Navbar from './Navbar';
import PatientUpcomingAppt from './Appointments/PatientUpcomingAppt';
import doctorsJson from '../database/doctors.json'
import { useNavigate } from "react-router-dom";
import '../Styles/Styles.Dashboard.scss';

const Dashboard = () => {
    const navigate = useNavigate();    
    const doctors = JSON.parse(JSON.stringify(doctorsJson));
    const [backendData, setBackendData] = useState({})
    useEffect(() => {
    fetch("/dashboard").then(
      response => response.json()
    ).then(
      data => {
        setBackendData(data)
      }
    )
    }, [])


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
                <div classname ="account">
                  <Navbar name={backendData.data.firstName + ' ' + backendData.data.lastName} email={backendData.data.email} patientID={backendData.data.id}/>
                </div>
                <div>
                  <PatientUpcomingAppt patientId={backendData.data.id} />
                </div>
                <div className="search">
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

              </div>
            )}
        </div>
    )
}

export default Dashboard