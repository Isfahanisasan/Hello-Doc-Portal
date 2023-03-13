import { useParams } from 'react-router-dom';
import PatientJSON from '../database/patients.json';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

import * as React from 'react';


const PatientProfile = () => {
  let { id } = useParams();
  const navigate = useNavigate();

  const patient = JSON.parse(JSON.stringify(PatientJSON));
  const info = patient.find((patient) => patient.id === id);

  return (
    <div>
      <Navbar />
      <div className='container card text-center'>
        <h1>
          {info.firstName} {info.lastName}
        </h1>
        <h2> Phone Number: {info.phoneNumber} </h2>
      </div>
    </div>
  );
};

export default PatientProfile;