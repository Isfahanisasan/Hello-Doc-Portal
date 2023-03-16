const express = require('express');
const router = express.Router();
const fs = require('fs');


router.get('/', (req, res) => {
    console.log(req.params)
    let patients = JSON.parse(fs.readFileSync('../halodoc/src/database/patients.json'))

    if (!req.session.patientID) {
        return res.redirect('/patientlogin');
      }
    const patient = patients.find((patient) => patient.id === req.session.patientID);
    res.json({data: patient})
});



module.exports = router;