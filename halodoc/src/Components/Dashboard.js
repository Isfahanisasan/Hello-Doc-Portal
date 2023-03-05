import React, {useState, useEffect} from 'react';
import Navbar from './Navbar';
import PatientUpcomingAppt from './Appointments/PatientUpcomingAppt';
import doctorsJson from '../database/doctors.json'
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import '../Styles/Styles.Dashboard.scss'
import RunSearch from './Search/RunSearch';



const Dashboard = () => {
    const navigate = useNavigate();
    const doctors = JSON.parse(JSON.stringify(doctorsJson));
    const [backendData, setBackendData] = useState({})


    useEffect(() => {
      axios.get('/dashboard').then((response) => {
      setBackendData(response.data)
    })})


    return(

        <div className='Dashboard'>
            {(typeof backendData.data === 'undefined') ? (
                <div style={{textAlign: "center"}}>
                  <Navbar/>
                  <h3> Please try logging in again</h3> <br/>
                  <img src={require("../Styles/img/loading.gif")} alt="" width="300px"/>
                </div>
            ) : (
                <div>
                <div classname ="account">
                  <Navbar name={backendData.data.firstName + ' ' + backendData.data.lastName} email={backendData.data.email} patientID={backendData.data.id}/>
                </div>
                <div className='container'>
                  <div className ='appointment'>
                    <PatientUpcomingAppt patientId={backendData.data.id} firstName={backendData.data.firstName} lastName={backendData.data.lastName}/>
                  </div>
                  <div className="search">
                  <img src={require("../Styles/img/background1.jpg")} alt="" width="500px" style={{marginTop:"20px", marginLeft:"20px"}} />
                    <RunSearch/>
                    <div className='doctorName'>
                    {doctors.map(function(item, i){
                    return (
                        <div className='items'>
                        <h3 onClick={() => navigate(`/doctors/${item?.id}`)}> {item.firstName} </h3>
                        </div>
                    )
                  })}
                  </div>
                  </div>
                  </div>

              </div>
            )}
        </div>
    )
}

export default Dashboard
