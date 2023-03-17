import {FaStar}from 'react-icons/fa';
import { useParams } from 'react-router-dom';

import { useNavigate } from 'react-router-dom';
import '../Styles/container.scss';
import '../Styles/Search.scss';
import Navbar from './Navbar';
import React, {useState, useEffect} from 'react';
import axios from 'axios';


import Button from '@mui/material/Button';
import { ButtonGroup } from '@mui/material';

const DoctorProfile = () => {
  
  let { id } = useParams();

  const navigate = useNavigate();


  const [backendData, setBackendData] = useState({})

  useEffect(() => {
    axios.get(`/doctors/${id}`).then((response) => {
    setBackendData(response.data)
  })}, [id])

  //When click handleReview, go to /review/doctor/id
  const handleReview = () => {
    navigate(`/review/doctor/${id}`);
  };

  const handleSchedule = async (e) => {
    navigate(`/schedule/${id}`);
  };

  return (
    <div>
      {(typeof backendData.data === 'undefined') ? (
                <div style={{textAlign: "center"}}>
                  <img src={require("../Styles/img/loading.gif")} alt="" width="300px"/>
                </div>
            ) : (
      <div> 
      <Navbar name={backendData.data.firstName + ' ' + backendData.data.lastName} email={backendData.data.email} patientID={backendData.data.id} gender={backendData.data.gender} />
      <div className='container card text-center'>
      <div className="row">
        <div className="col-lg-5" >
        <h1>
          <img
            src={backendData.dataDoc.ava_url}
            alt=''
            className='round-img'
            style={{ width: '300px',borderRadius:"50%" }}
          />
        </h1>
        </div>
        <div className='col-lg-5'>
        <h1>
          {backendData.dataDoc.firstName} {backendData.dataDoc.lastName}
        </h1>


        <h3>
          <img src={require("../Styles/img/doctorIcon.png")} alt='doctorIcon' width="25px"/>
          Specialty: {backendData.dataDoc.specialty}
        </h3>
        {backendData.dataReview && <h3>
          <img src ={require("../Styles/img/star.png")} alt='star' width="30px"/>
          {backendData.dataReview.rating}
          </h3>}
        <p> Phone number: {backendData.dataDoc.number} </p>
        <p> Email: {backendData.dataDoc.email} </p>

        <div style={{ margin: '30px' }}>
        <ButtonGroup variant='outlined' aria-label='outlined button group' >
          <Button onClick={handleSchedule}>Make appointment</Button>
          <Button onClick={handleReview}>Review</Button>
        </ButtonGroup>
        </div>
        </div>
      </div>
      
      </div>
      
      <div className="container text-start">
        <h2> Reviews</h2>
        {backendData.dataReview  &&
          backendData.dataReview.reviews.map(function (item, i) {
            return (
              <div key={i}>
                <div className="card" >
                  <div className="card-header">
                    {item.email.slice(0, 3)}**********
                  </div>
                  <div className="card-body">
                    <p> Rating:
                      {[...Array(item.rating)].map((_,index)=>(
                        <FaStar key ={index}/>
                      ))}
                      </p>
                    <p> "{item.review}" </p>
                  </div>
                </div>
                <br/>
              </div>
            );
          })}
      </div>
      </div>)}

    </div>
  );
};

export default DoctorProfile;
