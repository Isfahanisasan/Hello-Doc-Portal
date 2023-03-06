const express = require('express');
const session = require('express-session');
const fs = require('fs');
const path = require('path')
const patients = require('../halodoc/src/database/patients.json');
const doctors = require('../halodoc/src/database/doctors.json');

const app = express();
app.use(express.json());

app.use(
  session({
    secret: 'mySecretKey', // replace with your own secret key
    resave: false,
    saveUninitialized: true,
  })
);

app.get('/api', (req, res) => {
  res.json({ msg: 'Hello World' });
});

app.use('/patientlogin', require('./routes/patientlogin'));
app.use('/doctorlogin', require('./routes/doctorlogin'));
app.use('/patientlogout', require('./routes/patientlogout'));
app.use('/doctorlogout', require('./routes/doctorlogout'));
app.use('/dashboard', require('./routes/dashboard'));
app.use('/doctorDashboard', require('./routes/doctorDashboard'));
app.use('/patientsignup', require('./routes/patientsignup'));
app.use('/review', require('./routes/review'));
app.use('/makeappointment', require('./routes/makeappointment'));

<<<<<<< HEAD
app.get('/schedule/:id', async (req, res) => {
  if (!req.session.patientID) {
    return res.redirect('/patientlogin');
  }
=======


app.get('/docschedule', (req, res) =>{
  
  if (!req.session.doctorID) {
    console.log('Not logged in');
    return res.redirect('/doctorlogin');
  }
  const fileName = '../halodoc/src/database/appointment/doctor/' + req.session.doctorID + '.json';
 
  const doctorSchedule = JSON.parse(fs.readFileSync(fileName));
  const doctorsJson = JSON.parse(JSON.stringify(doctors));
  const currentDoctorJson = doctorsJson.find((doctor) => doctor.id === req.session.doctorID);
  const currentDoctor = JSON.parse(JSON.stringify(currentDoctorJson));



  
  

  res.json({currentDoctor: currentDoctor, doctorSchedule: doctorSchedule});

})


app.get('/schedule/:id', (req, res) => {
  
    if (!req.session.patientID) {
        return res.redirect('/patientlogin');
      }
    
    const patient = patients.find((patient) => patient.id === req.session.patientID)

    const fileName = '../halodoc/src/database/appointment/doctor/' + req.params.id + '.json';
    const doctorSchedule = JSON.parse(fs.readFileSync(fileName));

    res.json({data: patient, doctorSchedule: doctorSchedule})
  });
>>>>>>> origin/main

  const patient = patients.find(
    (patient) => patient.id === req.session.patientID
  );
  res.json({ data: patient });
});

app.post('/doctorsignup', (req, res) => {
  const formData = req.body;
  // console.log(formData);
  let data;

  //Handle case where user existed
  const doctor = doctors.find((doctor) => doctor.email === formData.email);
  if (doctor) {
    console.log('Doctor already exist');
    res.json(null);
    return;
  }

  try {
    let jsonData = fs.readFileSync('../halodoc/src/database/doctors.json');
    data = JSON.parse(jsonData);
  } catch (error) {
    data = [];
    console.log('New database initialized.');
  }
  let lastDoctorId = data.length > 0 ? parseInt(data[data.length - 1].id) : 0;
  let newDoctorId = lastDoctorId + 1;

  const newDoctor = {
    id: newDoctorId.toString(),
    ...formData,
  };
  data.push(newDoctor);
<<<<<<< HEAD
  fs.writeFileSync(
    '../halodoc/src/database/doctors.json',
    JSON.stringify(data, null, 2) + '\n'
  );
  res.send('Form submitted successfully!');
});

const PORT = process.env.PORT || 8888;
app.listen(PORT, () => {
  console.log(`server starting on port ${PORT}`);
});
=======
  fs.writeFileSync('../halodoc/src/database/doctors.json', JSON.stringify(data, null, 2) + '\n');
  const newFile = '../halodoc/src/database/appointment/doctor/' + newDoctor.id + '.json'
  fs.writeFile(newFile, JSON.stringify([]), err => {
    if (err) {
      console.error(err);
      return;
    }
  })
  res.send('Form submitted successfully!')
  
});
  
const PORT = process.env.PORT || 8888;
app.listen(PORT, () => {console.log(`server starting on port ${PORT}`)});
>>>>>>> origin/main
