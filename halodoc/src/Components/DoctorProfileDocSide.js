import {FaStar}from 'react-icons/fa';

import '../Styles/container.scss';
import '../Styles/Search.scss';
import axios from 'axios';


import React, {useState, useEffect} from 'react';
import DoctorNavbar from './DoctorNavbar';


const DoctorProfileDocSide = () => {
  const [backendData, setBackendData] = useState({})

  useEffect(() => {
    axios.get('/doctorProfileDoc').then(function (response) {
    console.log(response.data)
    setBackendData(response.data)
  })}, [])

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
            src={backendData.data.ava_url}
            alt=''
            className='round-img'
            style={{ width: '300px',borderRadius:"50%" }}
          />
        </h1>
        </div>
        <div className='col-lg-5' style={{marginTop:"50px"}}>
        <h1>
          {backendData.data.firstName} {backendData.data.lastName}
        </h1>


        <h3>
          <img src={require("../Styles/img/doctorIcon.png")}  alt='doctor-icon' width="25px"/>
          Specialty: {backendData.data.specialty}
        </h3>
        {backendData.reviews && <h3>
          <img src ={require("../Styles/img/star.png")} width="30px" alt='star' />
          {backendData.reviews.rating}
          </h3>}
        <p> contact :{backendData.data.number} | {backendData.data.email}</p>

        <div style={{ margin: '30px' }}>
        </div>
        </div>
      </div>
      
      </div>
      </div>)}

      <div className="container text-start">
        {backendData.reviews &&
          backendData.reviews.reviews.map(function (item, i) {
            return (
              <div className="card" key={i}>
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
