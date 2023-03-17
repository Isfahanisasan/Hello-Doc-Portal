import Navbar from './Navbar';
import "../Styles/Styles.Dashboard.scss"
import axios from 'axios';

import React, {useState, useEffect} from 'react';


const PatientProfile = () => {
  const [backendData, setBackendData] = useState({})

  useEffect(() => {
    axios.get('/patientProfile').then(function (response) {
    setBackendData(response.data)
  })}, [])

  return (
    <div>
       {(typeof backendData.data === 'undefined') ? (
                <div style={{textAlign: "center"}}>
                  <img src={require("../Styles/img/loading.gif")} alt="" width="300px"/>
                </div>
            ) : (
              <div>
                <Navbar name ={backendData.data.firstName + ' ' + backendData.data.lastName} email={backendData.data.email} patientID={backendData.data.id} gender={backendData.data.gender} />
                <div className='container card text-center'>
                <div className="row">
                  <div className="col-lg-5" >
                  <h1>
                    <img
                      src={require(`../Styles/img/${backendData.data.gender}.png`)}
                      alt=''
                      className='round-img'
                      style={{ width: '300px',borderRadius:"50%" }}
                    />
                  </h1>
                  </div>
                  <div className='col-lg-5' style={{marginTop:"100px"}}>
                  <h1>
                    {backendData.data.firstName} {backendData.data.lastName}
                  </h1>
                  <p> contact :{backendData.data.phoneNumber} <br/> {backendData.data.email}</p>
                  <div style={{ margin: '30px' }}>
                  </div>
                  </div>
                </div>
                
                </div>
              </div>
            )}
    </div>
  );
};

export default PatientProfile;