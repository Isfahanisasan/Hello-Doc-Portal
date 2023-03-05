import React from 'react'
import schedulesJson from '../../database/schedules.json'
import patientsJson from '../../database/patients.json'
import doctorsJson from '../../database/doctors.json'
import AppointmentInfo from './AppointmentInfo'
import '../../Styles/Styles.design.scss'
const PatientUpcomingAppt = ({patientId,firstName,lastName}) => {

    const schedules = JSON.parse(JSON.stringify(schedulesJson));
    // const patients = JSON.parse(JSON.stringify(patientsJson));
    const doctors = JSON.parse(JSON.stringify(doctorsJson));
    
    const schedule = schedules.filter((schedule) => schedule.patient_id === patientId)

    let myAppointments = [];
    const today = new Date();
    const options = { month: '2-digit', day: '2-digit', year: 'numeric' };
    const dateString = today.toLocaleDateString('en-US', options);

        
    for (let i = 0; i < schedule.length; ++i){
        const thisDoctor = doctors.find((doctor) => doctor.id === schedule[i].doctor_id)
    
        myAppointments.push({
            doctorName: thisDoctor.firstName + ' ' + thisDoctor.lastName,
            time: schedule[i].startTime,
            date: schedule[i].month+1 + '/' + schedule[i].date + '/' + schedule[i].year
        })
    
    }

    return(
        <div>
            <h1>Welcome! {firstName} {lastName}</h1>
            <p style={{color:"darkgreen"}}>Let's track your health Daily!</p>
            <h3 style={{marginBottom:"30px",marginTop:"30px"}}>Today: {dateString} </h3>
            <h3> Upcoming Appointments </h3>
            <div className='grid'>
            {myAppointments.map((appointment, i) => (
                <AppointmentInfo key={i} doctorName={appointment.doctorName} time={appointment.time} 
                date={appointment.date}/>
            ))}
            </div>
        </div>
        
       
    )

}
export default PatientUpcomingAppt