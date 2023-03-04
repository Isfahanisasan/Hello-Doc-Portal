import React, {useState, useEffect} from 'react';
import {useParams} from "react-router-dom";
import doctorsJson from '../database/doctors.json'
import StarRating from './Extra-components/starRating';
import axios from 'axios';
import '../Styles/Styles.Review.scss'


const Review = () => {
    const doctors = JSON.parse(JSON.stringify(doctorsJson));
    let { id } = useParams();
    const [email, setEmail] = useState('');
    const [review, setReview] = useState('');
    const [rating, setRating] = useState(null);
    const info = doctors.find((doctor) => doctor.id === id)
    const [alert, setAlert] = useState('');


    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await axios.post('/review', { id, email, rating, review });
            console.log(response.data)
            setAlert(response.data)
            // console.log(id)
            // console.log(email)
            // console.log(rating)
            // console.log(review)
        } 
        
          catch (err) {
          console.error(err);
        }
      };
    


    return (
        <div className='review'>
            <form onSubmit={handleSubmit}>
                <h1> Review for {info.firstName} </h1>
                <h1> Specialty {info.specialty} </h1>

                <h2> Your email: </h2>
                <input type='email' onChange={e => setEmail(e.target.value)} required/>
                <h2> Rating: </h2>
                <StarRating onRatingChange={(newValue) => setRating(newValue)} required/>
        
                <h2> Review: </h2>
                <textarea onChange={e => setReview(e.target.value)} required/>
                <button type='submit'> Submit </button>
                <p>{alert}</p>
            </form>
        </div>
    )
}
export default Review