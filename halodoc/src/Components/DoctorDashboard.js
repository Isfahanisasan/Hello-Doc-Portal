import React, {useState, useEffect}  from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';


const DoctorDashboard = () => {
    let navigate = useNavigate();
    const [backendData, setBackendData] = useState({})

    useEffect(() => {
      axios.get('/doctorDashboard').then(function (response) {
      setBackendData(response.data)
    })})


    const handleLogout= async (e) => {
      e.preventDefault();
      console.log('Click logout')
      try {
        const response = await axios.post('/doctorlogout');
        console.log(response.data.data)
        navigate(response.data.data)
      } catch (err) {
        console.error(err);
      }
    };

    return(
        <div>
            {(typeof backendData.data === 'undefined') ? (
                <div style={{textAlign: "center"}}>
                  <h2> Please try logging in again</h2> <br/>
                  <img src={require("../Styles/img/loading.gif")} alt="" width="300px"/> 
                </div>
            ) : (
              <div >

                <h1> {backendData.data.firstName} {backendData.data.lastName} </h1> 
                <button onClick={handleLogout}> Log out </button>

              </div>  
            )}
        </div>
    )
}

export default DoctorDashboard