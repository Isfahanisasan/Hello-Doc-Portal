import React, {useState} from 'react';
//import { useNavigate } from "react-router-dom";
import {useParams} from "react-router-dom";
import axios from 'axios';



const MakeAppointmentByDoctor = () => {
    // let{day} = useParams();
    // let{month} = useParams();
    // let{year} = useParams();
    // let{hour} = useParams();

    let{date, hour} = useParams(); 

    const [formValues, setFormValues] = useState({
        firstName: '',
        lastName: '',
        Bdate: '',

    });
    const [error, setError] = useState('');


    // a generic function to handle input change
    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setFormValues({
            ...formValues,
            [name]: value
        });

    };
    let dateObj = new Date(date);



    const handleSubmit = async (e) => {
        e.preventDefault(); 

        try{
          const response = await axios.post(`/makeappointmentbydoctor/${dateObj}/${hour}`, formValues);

          console.log(dateObj);
          console.log(response.data);
          if(response.status === 200){
            console.log('successful')
          } else {
            setError('There was an error with your signup')
          }
        }
        catch (err){
          console.error(err);
          setError('There was an error with your signup');
        }
    
      };

        return(

            <div>
            <section>
              <div className="makeAppt">
                <h1 >Appointee Patient </h1>
                <form onSubmit={handleSubmit}>
                  <label htmlFor="firstName">First name:</label><br />
                  <input type="text" id="firstName" name="firstName" placeholder="Appintee first name" value={formValues.firstName} onChange={handleInputChange} required/><br />

                  <label htmlFor="lastName">Last name:</label><br />
                  <input type="text" id="lastName" name="lastName" placeholder="Your last name"value={formValues.lastName} onChange={handleInputChange} required/><br />

                  <label htmlFor="Bdate">Birthday:</label><br />
                  <input type="date" id="Bdate" name="Bdate" placeholder="Birthdate:" value={formValues.Bdate} onChange={handleInputChange} required /><br />
                  <button type="submit">Submit</button>
                </form>
              </div>
            </section>

            <section>
              <div className ="text1">
              <h1>Provide strightforwad,fast medical appointment service</h1>
              <br/><br/>
              <h2>Save your Time and checky your appointment calendar Conveniently </h2> <br/>


              </div>
            </section>     

          </div>







        )
}

export default MakeAppointmentByDoctor;