import {useParams} from "react-router-dom";
import doctorsJson from '../database/doctors.json'


const Review = () => {
    const doctors = JSON.parse(JSON.stringify(doctorsJson));
    let { id } = useParams();
    const info = doctors.find((doctor) => doctor.id === id)
    return (
        <div>
            <h1> Review for {info.firstName} </h1>
            <h1> Specialty {info.specialty} </h1>

            <h2> Your name: </h2>
            <input/>
            <h2> Rating: </h2>
            <select id="gender" name="gender" required>
                <option value="">Select rating</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
            </select><br />
            
            <h2> Review: </h2>
            <textarea />
            <button> Submit </button>

           
        </div>
    )
}
export default Review