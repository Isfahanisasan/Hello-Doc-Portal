const express = require('express');
const router = express.Router();
const doctors = require('../../halodoc/src/database/doctors.json');

router.get('/', (req, res) => {
});

router.post('/', async (req, res) => {
    const { email, password } = req.body;
    const doctor = doctors.find((doctor) => doctor.email === email && doctor.password === password);
    if (!doctor) {
        res.json(null)
        return;
    }
    try {
        req.session.doctorID = doctor.id;
        res.json(doctor)
    } catch (err) {
      console.log(err)
    }
  });

module.exports = router;