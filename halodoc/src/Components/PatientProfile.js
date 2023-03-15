import { useParams } from 'react-router-dom';
import PatientJSON from '../database/patients.json';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import "../Styles/Styles.Dashboard.scss"

import * as React from 'react';


const PatientProfile = () => {
  let { id } = useParams();
  const navigate = useNavigate();

  const patient = JSON.parse(JSON.stringify(PatientJSON));
  const info = patient.find((patient) => patient.id === id);

  return (
    <div>
      <Navbar name ={info.firstName + ' ' + info.lastName} email={info.email} patientID={info.id} gender={info.gender} />
      <div className='container card text-center'>
      <div className="row">
        <div className="col-lg-5" >
        <h1>
          <img
            src={require(`../Styles/img/${info.gender}.png`)}
            alt=''
            className='round-img'
            style={{ width: '300px',borderRadius:"50%" }}
          />
        </h1>
        </div>
        <div className='col-lg-5' style={{marginTop:"100px"}}>
        <h1>
          {info.firstName} {info.lastName}
        </h1>
        <p> contact :{info.phoneNumber} <br/> {info.email}</p>
        <div style={{ margin: '30px' }}>
        </div>
        </div>
      </div>
      
      </div>
    </div>
  );
};

export default PatientProfile;