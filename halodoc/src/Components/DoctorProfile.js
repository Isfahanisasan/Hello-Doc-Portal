import {useParams} from "react-router-dom";
import doctorsJson from '../database/doctors.json'
import doctorReview from '../database/doctorReviews.json'
import { useNavigate } from "react-router-dom";

  
const DoctorProfile = () => {
    let { id } = useParams();
    const navigate = useNavigate();

    //Get doctors.json
    const doctors = JSON.parse(JSON.stringify(doctorsJson));
    const info = doctors.find((doctor) => doctor.id === id)

    //Get doctorReviews.json
    const reviewsJson = JSON.parse(JSON.stringify(doctorReview));
    const reviewObject = reviewsJson.find((item) => item.doctor_id === id)

    //When click handleReview, go to /review/doctor/id
    const handleReview = () => {
        navigate(`/review/doctor/${id}`)
    }

    const handleSchedule = async (e) => {
        navigate(`/schedule/${id}`)
    }

    return (
        <div>
            <h1> Name: {info.firstName}{' '}{info.lastName} </h1>
            <h1> Specialty: {info.specialty} </h1>
            {reviewObject && <h1> Rating: {reviewObject.rating} </h1>}
            <h1> Phone Number: {info.phoneNumber} </h1>
            <button onClick={handleSchedule}> Make appointment </button>
            <button onClick={handleReview}> Review </button>
            {reviewObject && reviewObject.reviews.map(function(item, i){
                return(
                    <div>
                        <p> ----------------- </p>
                        <p> {item.email} </p>
                        <p> {item.rating} </p>
                        <p> {item.review} </p>
                    </div>
                    
                )
            })}
            
        </div>
    )
}

export default DoctorProfile