const express = require('express');
const session = require("express-session");
const fs = require('fs');

const patients = require('../halodoc/src/database/patients.json');
const doctors = require('../halodoc/src/database/doctors.json');


const app = express();
app.use(express.json())

app.use(session({
    secret: 'mySecretKey', // replace with your own secret key
    resave: false,
    saveUninitialized: true
  }));

app.get('/api', (req, res) => {res.json({msg: 'Hello World'})});

app.get('/patientlogin', (req, res) => {
    res.redirect('/patientlogin');
});

app.post('/patientlogin', async (req, res) => {
    const { email, password } = req.body;
    const patient = patients.find((patient) => patient.email === email && patient.password === password);
    if (!patient) {
        res.json(null)
        return;
    }
    try {
        req.session.patientID = patient.id;
        res.json(patient)
    } catch (err) {
      console.log(err)
    }
  });

app.post('/logout', (req, res) => {
    req.session.patientID = null; // deletes the patientID property from the session object
    console.log('Post logout')
    res.json({data: '/patientlogin'});
});

app.get('/dashboard', async (req, res) => {
    console.log(req.session.patientID)
    if (!req.session.patientID) {
        return res.redirect('/patientlogin');
      }
    const patient = patients.find((patient) => patient.id === req.session.patientID);
    res.json({data: patient})
  });



  app.post('/patientsignup', async (req, res) => {
    const formData = req.body;
    console.log(formData);
    let data; 
    //error handling for when the file doesn't exist
    //if (fs.existsSync(filePath)) {
    //  const jsonData = fs.readFileSync(filePath);
    //  data = JSON.parse(jsonData);
    //} else {
    //  fs.writeFileSync(filePath, JSON.stringify(data));
    //}

    //error handling for when patients.json is empty so it wouldn't throw an error in parse module
    //it should also be done in other posts it will catch the error if error handling is also done in other posts
    //this still reads the whole databse with each submission. I couldn't find a better way to do it? 

    try {
      let jsonData = fs.readFileSync('../halodoc/src/database/patients.json');
      data  = JSON.parse(jsonData);

    } catch (error) {
      data = [];
      console.log('New database initialized.');
    }
    let lastPatientId = data.length > 0 ? parseInt(data[data.length-1].id): 0;
    let newPatientId = lastPatientId + 1; 

    const newPatient = {
      id: newPatientId.toString(),
      ...formData
    }
    data.push(newPatient);
    fs.writeFileSync('../halodoc/src/database/patients.json', JSON.stringify(data, null, 2) + '\n');
    res.send('Form submitted successfully!')
    
  });

  app.post('/doctorsignup', async (req, res) => {
    const formData = req.body;
    console.log(formData);
    let data; 
    //error handling for when the file doesn't exist
    //if (fs.existsSync(filePath)) {
    //  const jsonData = fs.readFileSync(filePath);
    //  data = JSON.parse(jsonData);
    //} else {
    //  fs.writeFileSync(filePath, JSON.stringify(data));
    //}

    //error handling for when doctors.json is empty so it wouldn't throw an error in parse module
    //it should also be done in other posts it will catch the error if error handling is also done in other posts
    //this still reads the whole databse with each submission. I couldn't find a better way to do it? 

    try {
      let jsonData = fs.readFileSync('../halodoc/src/database/doctors.json');
      data  = JSON.parse(jsonData);

    } catch (error) {
      data = [];
      console.log('New database initialized.');
    }
    let lastDoctorId = data.length > 0 ? parseInt(data[data.length-1].id): 0;
    let newDoctorId = lastDoctorId + 1; 

    const newDoctor = {
      id: newDoctorId.toString(),
      ...formData
    }
    data.push(newDoctor);
    fs.writeFileSync('../halodoc/src/database/doctors.json', JSON.stringify(data, null, 2) + '\n');
    res.send('Form submitted successfully!')
    
  });



const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {console.log(`server starting on port ${PORT}`)});