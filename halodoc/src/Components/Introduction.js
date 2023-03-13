import React from 'react';
import '../Styles/Styles.Introduction.scss';
import { Link } from 'react-router-dom';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import Navbar from './Navbar';
import { margin } from '@mui/system';
import { useNavigate } from 'react-router-dom';

const Introduction = () => {
  const navigate = useNavigate();
  return (
    <div className='introduction'>
      <Navbar/>

      <div className="container">
        <div className="row">

          <div className="col-lg-7">
            <div className='text'>
              <h1> Appointment with your doctors made easy! </h1>
              <p className='text2' style={{ color: 'darkcyan' }}> Skip calling and make appointments with your doctors just through a few clicks </p>
              <button className='button button1' onClick={() => navigate('/patientLogin')}> Sign In</button>
              <button className='button button2' onClick={() => navigate('/patientsignup')}> Sign up</button>
              <div style={{ display: 'flex', alignItems: 'center',marginTop:"50px", gap:"10px"}}>
                <p style={{color:"darkgreen",marginTop:"45px"}}>Are you a doctor?</p>
                <Link to='/DoctorLogin'>
                  <button className='button button3'>Click Here!</button>
                </Link>
              </div>
            </div>
            
          </div>

          <div className="col-lg-5">
            <div className='picture'>
              <img src={require('../Styles/img/cardiologist.jpg')} alt='' width='500px' />
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};

export default Introduction;
