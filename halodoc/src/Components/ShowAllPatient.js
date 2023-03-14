import React, {useState, useEffect}  from 'react';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../Styles/Styles.ShowAllPatient.scss'
import DoctorNavbar from './DoctorNavbar'

const ShowAllPatient = () => {
    let navigate = useNavigate();
    const [backendData, setBackendData] = useState({})
    const [searchField, setSearchField] = useState("")

    useEffect(() => {
      axios.get('/showallpatient').then(function (response) {
      console.log(response.data);
      setBackendData(response.data);
    })}, [])

    // searchUsers = (text) => {
    //   const doctors = JSON.parse(JSON.stringify(Doctors));
    //   if (text){
  
    //     const doctor = doctors.filter((doctor) =>
    //       (doctor.firstName+doctor.lastName+doctor.specialty).toLowerCase().includes(text.toLowerCase())
    //     );
    //     this.setState({ users: doctor, loading: false });
    //   }
    //   else
    //     this.setState({ users: doctors, loading: false });
    // };
    const searchPatient = () => {
      const searchContent = document.getElementById('searchContent').innerHTML;
      const temp = JSON.parse(JSON.stringify(backendData.patientsdata));
      let length_temp = temp.length;
      let patient_list = [];
      console.log(searchContent)
      console.log(temp)
      // console.log(temp);
      // const patients = temp.filter(patient => 
      //   (patient.firstName+patient.lastName).toLowerCase().includes(searchContent.toLowerCase())
      
      // );
      for (let i = 0; i < length_temp; i++) {
        let item = temp[i];
        console.log((item.firstName+item.lastName).toLowerCase().includes(searchContent.toLowerCase()));
        if ((item.firstName+item.lastName).toLowerCase().includes(searchContent.toLowerCase())) {
          patient_list.push(item);
        }
      }
      console.log(patient_list);
      const newBackEndData = {
        ...backendData,
        patientsdata: patient_list
      }
      setBackendData(newBackEndData);
    }

    return(
        <div>
            {(typeof backendData.doctordata === 'undefined') ? (
                <div className='loading'>
                  <img src={require("../Styles/img/loading.gif")} alt="" width="300px"/> 
                </div>
            ) : (
              
              <div className='ShowAllPatient' >
                <DoctorNavbar name= {backendData.doctordata.firstName + backendData.doctordata.lastName} id={backendData.doctordata.id} url={backendData.doctordata.ava_url} />
                <div className='container'>
                  <div className='row'>
                    {/* <div className='col-lg-2'>
                     
                    </div> */}
                    <div>

                        {/* Today appointment */}
                        <div className='TodayAppointment'>
                          <h2> Look up patients' profiles </h2>
                          <div className='container'>

                            <div className="card header"  >
                              <div contentEditable="true" id='searchContent'> Search Box </div>
                              <button type="button" onClick={searchPatient}>Search</button>
                            </div>
                            <div className='gallery-card'>
                            {backendData.patientsdata
                              .map(patient => (
                              <div className="card card-format" style={{width: '18rem'}}>
                                <div className="card-body">
                                  <div className='row'> 
                                    <p>Name: {patient.firstName} {patient.lastName}</p>
                                    <p>Birthday: {patient.Bdate} </p>
                                    <p>Email: {patient.email} </p>
                                  </div>                                 
                                </div>
                              </div>
                            ))}
                            </div>
                    
                        </div>
                        </div>
                    </div>                    
                    <div className='col-lg-2'> 
                      
                    </div>
                  </div>
                </div>
              </div>  
            )}
        </div>
    )
}

export default ShowAllPatient