import { useParams } from 'react-router-dom';
import doctorsJson from '../database/doctors.json';
import doctorReview from '../database/doctorReviews.json';
import { useNavigate } from 'react-router-dom';
import '../Styles/container.scss';
import '../Styles/Search.scss';

import * as React from 'react';
import Button from '@mui/material/Button';
import { ButtonGroup } from '@mui/material';

import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));


const DoctorProfile = () => {
  let { id } = useParams();
  const navigate = useNavigate();

  //Get doctors.json
  const doctors = JSON.parse(JSON.stringify(doctorsJson));
  const info = doctors.find((doctor) => doctor.id === id);

  //Get doctorReviews.json
  const reviewsJson = JSON.parse(JSON.stringify(doctorReview));
  const reviewObject = reviewsJson.find((item) => item.doctor_id === id);



  //When click handleReview, go to /review/doctor/id
  const handleReview = () => {
    navigate(`/review/doctor/${id}`);
  };

  const handleSchedule = async (e) => {
    navigate(`/schedule/${id}`);
  };

  return (
    <div>
      <header>
        <img
          src={require('../Styles/img/HelloDoc_Logo.png')}
          alt=''
          width='300px'
        />
      </header>

      <div className='container' className='card text-center'>
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
        <div style={{ margin: '30px' }}></div>

        <ButtonGroup variant='outlined' aria-label='outlined button group'>
          <Button onClick={handleSchedule}>Make appointment</Button>
          <Button onClick={handleReview}>Review</Button>
        </ButtonGroup>

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
    </div>
  );
};

export default DoctorProfile;
