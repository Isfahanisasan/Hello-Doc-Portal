const express = require('express');
const session = require("express-session");
// const fs = require('fs');

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

app.use('/patientlogin', require('./routes/patientlogin'));
app.use('/doctorlogin', require('./routes/doctorlogin'));
app.use('/patientlogout', require('./routes/patientlogout'));
app.use('/doctorlogout', require('./routes/doctorlogout'));
app.use('/dashboard', require('./routes/dashboard'));
app.use('/doctorDashboard', require('./routes/doctorDashboard'));
app.use('/patientsignup', require('./routes/patientsignup'));

app.get('/schedule/:id', async (req, res) => {
    if (!req.session.patientID) {
        return res.redirect('/patientlogin');
      }
    
    const patient = patients.find((patient) => patient.id === req.session.patientID);
    res.json({data: patient})
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
  
  //Handle case where user existed
  const doctor = doctors.find((doctor) => doctor.email === formData.email);
  if (doctor) {
      console.log("Doctor alrady exist")
      res.json(null)
      return;
  }
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
  
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {console.log(`server starting on port ${PORT}`)});