const express = require('express');
const router = express.Router();
const doctors = require('../../halodoc/src/database/doctors.json');
const patients = require('../../halodoc/src/database/patients.json');
const fs = require('fs');


router.get('/', async (req, res) => {
  // console.log(req.session.doctorID)
  if (!req.session.doctorID) {
      return res.redirect('/doctorlogin');
    }
  const doctor = doctors.find((doctor) => doctor.id === req.session.doctorID);
  const fileName = '../halodoc/src/database/appointment/doctor/' + req.session.doctorID + '.json';
  let doctorSchedule = JSON.parse(fs.readFileSync(fileName));

  doctorSchedule = doctorSchedule.filter(item => new Date(item.date).getTime() === new Date('03/14/2023').getTime())

  const newDocSchedule = doctorSchedule.map((appointments,i) => {
    const patient = patients.find(patient => patient.id === appointments.patient_id)
    const patientName = `${patient.firstName} ${patient.lastName}`;
    const patientEmail = `${patient.email}`;
    const patientBirthday = `${patient.Bdate}`;


    return { ...appointments, patientName, patientEmail, patientBirthday};
  })
  

  res.json({data: doctor, appointment: newDocSchedule})
});

module.exports = router;

