const express = require('express');
const router = express.Router();
const fs = require('fs');


router.post('/', async (req, res) => {
    
    const formData = req.body;
    let data; 
   
    
    
    
    //Handle case that patient already existed
    try {
        let jsonData = fs.readFileSync('../halodoc/src/database/patients.json');
        data  = JSON.parse(jsonData);

    } catch (error) {
        data = [];
        console.log('New database initialized.');
    }
    const patient = data.find((patient) => patient.email === formData.email);

    if (patient) {
        res.json("Patient already exist")
        return;
    }

    let lastPatientId = data.length > 0 ? parseInt(data[data.length-1].id): 0;
    let newPatientId = lastPatientId + 1; 

    const newPatient = {
        id: newPatientId.toString(),
        ...formData
    }
    data.push(newPatient);
    fs.writeFileSync('../halodoc/src/database/patients.json', JSON.stringify(data, null, 2) + '\n');

    const newFile = '../halodoc/src/database/appointment/patient/' + newPatient.id + '.json'
    fs.writeFile(newFile, JSON.stringify([]), err => {
        if (err) {
        console.error(err);
        return;
        }
    })

    res.json('/doctordashboard');
    
});

module.exports = router;