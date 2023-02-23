import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Introduction from './Components/Introduction'
import PatientLogin from './Components/PatientLogin'
import PatientSignup from './Components/PatientSignup'
import React from 'react'
import Dashboard from './Components/Dashboard';


function App() {
  
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Introduction/>}></Route>
        <Route path='/dashboard' element={<Dashboard/>}></Route>
        <Route path='/patientLogin' element={<PatientLogin/>}></Route>
        <Route path='/patientsignup' element={<PatientSignup/>}></Route>
      </Routes>
    </Router>
    
    
  );
}

export default App;
