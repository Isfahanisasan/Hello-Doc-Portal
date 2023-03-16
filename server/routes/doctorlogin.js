const express = require('express');
const router = express.Router();
const fs = require('fs');
const hashHelper = require('../helper/hashHelper.js');

router.get('/', (req, res) => {
});

router.post('/', async (req, res) => {
    let doctors = JSON.parse(fs.readFileSync('../halodoc/src/database/doctors.json'))

    const { email, password } = req.body;
    const doctor = doctors.find((doctor) => doctor.email === email);
    if (!doctor) {
        res.json(null)
        return;
    }
    else {
      let password_matched = await hashHelper.comparePassword(password, doctor.password);
      if(password_matched) {
        try {
          req.session.doctorID = doctor.id;
          res.json(doctor)
        } catch (err) {
          console.log(err)
        }
      }
    }
  });

module.exports = router;