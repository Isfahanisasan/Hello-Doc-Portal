import React, {useState} from 'react';
import '../Styles/Styles.PatientSignup.scss';
import axios from 'axios';


const PatientSignup = () => {
  const [formValues, setFormValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    number: '',
    Bdate: '',
    gender: '',
  });

  const [error, setError] = useState('');
  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setFormValues({
      ...formValues,
      [name]: value
    });
  };

 
  const handleSubmit = async (e) => {
    e.preventDefault(); 
    try{
      const response = await axios.post('/patientsignup', formValues);
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
        <div className='patientsignup'>
          <header>
            <img src={require("../Styles/img/HelloDoc_Logo.png")} alt="" width="300px" />
          </header>

          <div>
            <section>
              <div className="signUp">
                <h1 > Patient-signup</h1>
                <form onSubmit={handleSubmit}>
                  <label htmlFor="firstName">First name:</label><br />
                  <input type="text" id="firstName" name="firstName" placeholder="Your first name" value={formValues.firstName} onChange={handleInputChange} required/><br />

                  <label htmlFor="lastName">Last name:</label><br />
                  <input type="text" id="lastName" name="lastName" placeholder="Your last name"value={formValues.lastName} onChange={handleInputChange} required/><br />

                  <label htmlFor="email">Email:</label><br />
                  <input type="email" id="email" name="email" placeholder="Your email"value={formValues.email} onChange={handleInputChange} required/><br />
                  <label htmlFor="password">Password:</label><br />
                  <input type="password" id="password" name="password" placeholder="Password" value={formValues.password} onChange={handleInputChange} required /><br />

                  <label htmlFor="number">Phone Number:</label><br />
                  <input type="text" id="number" name="number" placeholder="Your phone number"value={formValues.number} onChange={handleInputChange} required/><br />

                  <label htmlFor="Bdate">Birthday:</label><br />
                  <input type="date" id="Bdate" name="Bdate" placeholder="Birthdate:"value={formValues.Bdate} onChange={handleInputChange} required/><br />

                  <label htmlFor="gender">Gender:</label><br />
                  <select id="gender" name="gender" value={formValues.gender} onChange={handleInputChange} required>
                    <option value="">Select Gender</option>
                    <option value="Female">Female</option>
                    <option value="Male">Male</option>
                  </select><br />

                  <button type="submit">Submit</button>
                </form>
              </div>
            </section>

            <section>
              <div className ="text1">
              <h1>Provide strightforwad,fast medical appointment service</h1>
              <br/><br/>
              <h2>Save your Time and checky your appointment calendar Conveniently </h2> <br/>
              <img src={require("../Styles/img/doctor_online_3.jpg")} alt="" width="300px" height="250px" className="image"/>
              
              </div>
            </section>     

          </div>


        </div>

    )
}

export default PatientSignup