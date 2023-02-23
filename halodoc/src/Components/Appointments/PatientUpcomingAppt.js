import React from 'react'
import schedulesJson from '../../database/schedules.json'
import patientsJson from '../../database/patients.json'
import doctorsJson from '../../database/doctors.json'


const PatientUpcomingAppt = ({patientId}) => {
    const schedules = JSON.parse(JSON.stringify(schedulesJson));
    // console.log(schedules)

    const patients = JSON.parse(JSON.stringify(patientsJson));
    const doctors = JSON.parse(JSON.stringify(doctorsJson));
    // console.log(patients)
    
    const schedule = schedules.filter((schedule) => schedule.patient_id === patientId)
 
    console.log(schedule)
 

    return(
        <div>
            <h2> Upcoming Appointments </h2>
            <p> Will be shown here </p>
        </div>
       
    )

}
export default PatientUpcomingAppt