const express = require('express');
const router = express.Router();
const fs = require('fs');

router.get('/', async (req, res) => {
    // console.log(req.session.patientID)
    let doctors = JSON.parse(fs.readFileSync('../halodoc/src/database/doctors.json'))
    let patients = JSON.parse(fs.readFileSync('../halodoc/src/database/patients.json'))

  
    if (!req.session.doctorID) {
        return res.redirect('/doctorlogin');
      }
    const doctor = doctors.find((doctor) => doctor.id === req.session.doctorID);
    res.json({data: doctor, dataPatient: patients})
  });
  
module.exports = router;