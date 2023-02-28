import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import {Switch } from "react-router";

import Introduction from './Components/Introduction'
import PatientLogin from './Components/PatientLogin'
import DoctorLogin from './Components/DoctorLogin'
import PatientSignup from './Components/PatientSignup'
import React from 'react'
import Dashboard from './Components/Dashboard';
import DoctorDashboard from './Components/DoctorDashboard';
import DoctorSignUp from './Components/DoctorSignup';
import DoctorProfile from './Components/DoctorProfile';
import Review from './Components/Review';
import Schedule from './Components/Appointments/Schedule'



function App() {
  
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Introduction/>}></Route>
        <Route path='/dashboard' element={<Dashboard/>}></Route>
        <Route path='/doctorDashboard' element={<DoctorDashboard/>}></Route>
        <Route path='/patientLogin' element={<PatientLogin/>}></Route>
        <Route path='/doctorLogin' element={<DoctorLogin/>}></Route>
        <Route path='/patientsignup' element={<PatientSignup/>}></Route>
        <Route path='/doctorsignup' element={<DoctorSignUp/>}></Route>
        <Route path="/doctors/:id" element={<DoctorProfile/>} />
        <Route path="/review/doctor/:id" element={<Review/>} />
        <Route path="/schedule/:id" element={<Schedule/>} />
        
      </Routes>

  
          
      
    </Router>
    
    
  );
}

export default App;
