import { useParams } from 'react-router-dom';
import {FaStar}from 'react-icons/fa';

import doctorsJson from '../database/doctors.json';
import doctorReview from '../database/doctorReviews.json';
import { useNavigate } from 'react-router-dom';
import '../Styles/container.scss';
import '../Styles/Search.scss';
import axios from 'axios';


import React, {useState, useEffect} from 'react';
import DoctorNavbar from './DoctorNavbar';



// const DoctorProfileDocSide = styled(Paper)(({ theme }) => ({
//     backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
//     ...theme.typography.body2,
//     padding: theme.spacing(1),
//     textAlign: 'center',
//     color: theme.palette.text.secondary,
//   }));


const DoctorProfileDocSide = () => {
  let { id } = useParams();
  const navigate = useNavigate();

  //Get doctors.json
  const doctors = JSON.parse(JSON.stringify(doctorsJson));
  const info = doctors.find((doctor) => doctor.id === id);

  //Get doctorReviews.json
  const reviewsJson = JSON.parse(JSON.stringify(doctorReview));
  const reviewObject = reviewsJson.find((item) => item.doctor_id === id);

  const [backendData, setBackendData] = useState({})

  useEffect(() => {
    axios.get('/doctorDashboard').then(function (response) {
    setBackendData(response.data)
  })}, [])

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
                <div className='loading'>
                  <img src={require("../Styles/img/loading.gif")} alt="" width="300px"/> 
                </div>
            ) : (
      <div>
        <DoctorNavbar name= {backendData.data.firstName + backendData.data.lastName} id={backendData.data.id} url={backendData.data.ava_url} />
        <div className='container card text-center'>
      <div className="row">
        <div className="col-lg-5" >
        <h1>
          <img
            src={info.ava_url}
            alt=''
            className='round-img'
            style={{ width: '300px',borderRadius:"50%" }}
          />
        </h1>
        </div>
        <div className='col-lg-5' style={{marginTop:"50px"}}>
        <h1>
          {info.firstName} {info.lastName}
        </h1>


        <h3>
          <img src={require("../Styles/img/doctorIcon.png")} width="25px"/>
          Specialty: {info.specialty}
        </h3>
        {reviewObject && <h3>
          <img src ={require("../Styles/img/star.png")} width="30px"/>
          {reviewObject.rating}
          </h3>}
        <p> contact :{info.number} | {info.email}</p>

        <div style={{ margin: '30px' }}>
        </div>
        </div>
      </div>
      
      </div>
      </div>)}

      <div className="container text-start">
        {reviewObject &&
          reviewObject.reviews.map(function (item, i) {
            return (
              <div className="card">
                <div className="card-header">
                {item.email}
                  </div>
                  <div className="card-body">
                    
                    <p> Rating:
                      {[...Array(item.rating)].map((_,index)=>(
                        <FaStar key ={index}/>
                      ))}</p>
                <p> "{item.review}" </p>
              </div>
              </div>
            );
          })}
          </div>
    </div>
  );
};

export default DoctorProfileDocSide;
