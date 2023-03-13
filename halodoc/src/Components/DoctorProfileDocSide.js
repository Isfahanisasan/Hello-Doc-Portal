import { useParams } from 'react-router-dom';

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
                  <h2 className='loading-text'> Loading </h2>
                  <img src={require("../Styles/img/loading.gif")} alt="" width="300px"/> 
                </div>
            ) : (
      <div>
        <DoctorNavbar name= {backendData.data.firstName + backendData.data.lastName} id={backendData.data.id} />
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

export default DoctorProfileDocSide;
