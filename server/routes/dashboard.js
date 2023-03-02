const express = require('express');
const router = express.Router();
const patients = require('../../halodoc/src/database/patients.json');

router.get('/', async (req, res) => {
  // console.log(req.session.patientID)
  if (!req.session.patientID) {
      return res.redirect('/patientlogin');
    }
  const patient = patients.find((patient) => patient.id === req.session.patientID);
  res.json({data: patient})
});

module.exports = router;