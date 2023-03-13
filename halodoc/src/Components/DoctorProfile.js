import { useParams } from 'react-router-dom';

import doctorsJson from '../database/doctors.json';
import doctorReview from '../database/doctorReviews.json';
import { useNavigate } from 'react-router-dom';
import '../Styles/container.scss';
import '../Styles/Search.scss';
import Navbar from './Navbar';
import axios from 'axios';

import Button from '@mui/material/Button';
import { ButtonGroup } from '@mui/material';

import { styled } from '@mui/material/styles';

import Paper from '@mui/material/Paper';
import React, {useState, useEffect} from 'react';



const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));


  const DoctorProfile = () => {
  const [backendData, setBackendData] = useState({})
  let { id } = useParams();
  const navigate = useNavigate();

  //Get doctors.json
  const doctors = JSON.parse(JSON.stringify(doctorsJson));
  const info = doctors.find((doctor) => doctor.id === id);

  //Get doctorReviews.json
  const reviewsJson = JSON.parse(JSON.stringify(doctorReview));
  const reviewObject = reviewsJson.find((item) => item.doctor_id === id);


  useEffect(() => {
    axios.get('/dashboard').then((response) => {
    setBackendData(response.data)
  })})

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
                  <Navbar/>
                  <h3> Please try logging in again</h3> <br/>
                  <img src={require("../Styles/img/loading.gif")} alt="" width="300px"/>
                </div>
            ) : (
      <div>
      <Navbar name={backendData.data.firstName + ' ' + backendData.data.lastName} email={backendData.data.email} patientID={backendData.data.id} gender={backendData.data.gender}/>
      <div className='container card text-center'>
        <h1>
          <img
            src={info.ava_url}
            alt=''
            className='round-img'
            style={{ width: '200px' }}
          />
        </h1>

        <h1>
          {info.firstName} {info.lastName}
        </h1>



        <h2> Specialty: {info.specialty} </h2>
        {reviewObject && <h2> Rating: {reviewObject.rating} </h2>}
        <h2> Phone Number: {info.number} </h2>

        <div style={{ margin: '30px' }}>
        <ButtonGroup variant='outlined' aria-label='outlined button group' >
          <Button onClick={handleSchedule}>Make appointment</Button>
          <Button onClick={handleReview}>Review</Button>
        </ButtonGroup>
        </div>

        

        {reviewObject &&
          reviewObject.reviews.map(function (item, i) {
            return (
              <div>
                <p> ----------------- </p>
                <p> {item.email} </p>
                <p> {item.rating} </p>
                <h3> {item.review} </h3>
              </div>
            );
          })}
      </div>
      </div>)}
    </div>
  );
};

export default DoctorProfile;
