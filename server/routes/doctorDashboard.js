const express = require('express');
const router = express.Router();
const doctors = require('../../halodoc/src/database/doctors.json');

router.get('/', async (req, res) => {
  // console.log(req.session.doctorID)
  if (!req.session.doctorID) {
      return res.redirect('/doctorlogin');
    }
  const doctor = doctors.find((doctor) => doctor.id === req.session.doctorID);
  res.json({data: doctor})
});

module.exports = router;

