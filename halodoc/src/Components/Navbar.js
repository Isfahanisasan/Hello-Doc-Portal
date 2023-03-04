import React from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import '../Styles/Styles.Dashboard.scss';



const Navbar = ({name, email,patientID}) => {
    let navigate = useNavigate(); 

    const handleLogout= async (e) => {
      
        e.preventDefault();
        console.log('Click logout')
        try {
          const response = await axios.post('/patientlogout');
          console.log(response.data.data)
          navigate(response.data.data)
        } catch (err) {
          console.error(err);
        }
      };

    return(
        <div>
        
            <Link to='/dashboard'> 
                <img src={require("../Styles/img/HelloDoc_Logo.png")} alt="" width="300px" />
            </Link>
            <div className='account'>
            <p className='name'> {name} </p>
            <p className='email'> {email} </p>
            </div>
            <div className='picture1'>
            <img src={(`https://xsgames.co/randomusers/assets/avatars/pixel/${patientID}.jpg`)} alt={`Avatar for patient ${patientID}`} className='profile'></img>
            </div>
            <div className='buttonStyle'>
            <button onClick={handleLogout} > Log out </button>
            </div>
            
            
        </div>
    )
}

export default Navbar