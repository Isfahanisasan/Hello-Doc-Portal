import React, {useState, useEffect} from 'react';
import {useParams} from "react-router-dom";
import doctorsJson from '../database/doctors.json'
import StarRating from './Extra-components/starRating';
import axios from 'axios';
import '../Styles/Styles.Review.scss'
import Navbar from './Navbar';
import { useNavigate } from "react-router-dom";

const Review = () => {
    const navigate = useNavigate();
    const doctors = JSON.parse(JSON.stringify(doctorsJson));
    let { id } = useParams();
    const [email, setEmail] = useState('');
    const [review, setReview] = useState('');
    const [rating, setRating] = useState(null);
    const info = doctors.find((doctor) => doctor.id === id)
    const [backendData, setBackendData] = useState({})

    useEffect(() => {
        axios.get('/dashboard').then((response) => {
        setBackendData(response.data)
      })})

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await axios.post('/review', { id, email, rating, review });
            navigate(response.data)
        } 
        catch (err) {
          console.error(err);
        }
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
        <div className='container'> 
           
        
        <div className='review'>

            <form onSubmit={handleSubmit}>
                <div className='doctorTitle'>
                <img src={info.ava_url} alt='' className='profile' style={{ borderRadius: '50%', width:'200px' }}></img>
                <h1> Review for Dr {info.firstName} {' '}  {info.lastName} </h1>
                <h3> Specialty: {info.specialty} </h3>
                </div>
               

                <label htmlFor="exampleInputEmail1">Email address</label>
                <input type="email" onChange={e => setEmail(e.target.value)} className="form-control" placeholder="Enter email" required/>
                <p> Rating: </p>
                <StarRating onRatingChange={(newValue) => setRating(newValue)} required/>
        
                <div className="form-group">
                    <label> Review </label>
                    <textarea onChange={e => setReview(e.target.value)} className="form-control" id="exampleFormControlTextarea1" rows="3" required/>
                    <button className= 'btn btn-success' type='submit'> Submit </button>
                </div>
            </form>
            
        </div>
        </div>
        </div>

            )}

        </div>
        
    )
}
export default Review