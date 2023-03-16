const express = require('express');
const session = require('express-session');
const fs = require('fs');
const path = require('path')


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
app.use('/showallpatient', require('./routes/showallpatient'));
app.use('/patientsignup', require('./routes/patientsignup'));
app.use('/review', require('./routes/review'));
app.use('/makeappointment', require('./routes/makeappointment'));
app.use('/addNewPatient', require('./routes/addNewPatient'));
app.use('/doctorsignup', require('./routes/doctorsignup'));
app.use('/makeAppointmentByDoctor', require('./routes/makeAppointmentByDoctor'));
app.use('/doctorProfileDoc', require('./routes/doctorProfileDoc'));
app.use('/patientProfile', require('./routes/patientProfile'));

app.get('/doctors/:id', (req, res) => {

  let reviews = JSON.parse(fs.readFileSync('../halodoc/src/database/doctorReviews.json'))
  let doctors = JSON.parse(fs.readFileSync('../halodoc/src/database/doctors.json'))
  let patients = JSON.parse(fs.readFileSync('../halodoc/src/database/patients.json'))


  if (!req.session.patientID) {
      return res.redirect('/patientlogin');
  }

  const patient = patients.find((patient) => patient.id === req.session.patientID);
 

  const doctor = doctors.find((doctor) => doctor.id === req.params.id)
  console.log(doctor)

  const review = reviews.find((item) => item.doctor_id === req.params.id);

  res.json({data: patient, dataDoc: doctor, dataReview: review})
  });



app.get('/patientUpcoming/:id', (req, res) => {
  let doctors = JSON.parse(fs.readFileSync('../halodoc/src/database/doctors.json'))

  if (!req.session.patientID) {
    console.log('Not logged in');
    return res.redirect('/doctorlogin');
  }
  const fileName = '../halodoc/src/database/appointment/patient/' + req.params.id + '.json';
  const patientSchedule = JSON.parse(fs.readFileSync(fileName));

  const futureDates = patientSchedule.filter(entry => {
    const entryDate = new Date(entry.date);
    return entryDate >= new Date(new Date().toLocaleDateString());
  });

  const filteredScheduleWithDoctorNames = futureDates.map((appointments,i) => {
    const doctor = doctors.find(doctor => doctor.id === appointments.doctor_id)
    const doctorName = `${doctor.firstName} ${doctor.lastName}`;
    const doctorSpecialty = `${doctor.specialty}`;
    return { ...appointments, doctorName, doctorSpecialty };
  })

  res.json({patientSchedule: filteredScheduleWithDoctorNames})

})


app.post('/cancelAppointment', (req, res) => {
  
    // doctor_id: '3',
    // doctorName: 'John Smith',
    // specialty: 'Orthopaedic',
    // startTime: '10:30',
    // date: '3/17/2023',
    // pos: 0

  if (!req.session.patientID) {
    console.log('Not logged in');
    return res.redirect('/patientlogin');
  }

  const fileName = '../halodoc/src/database/appointment/patient/' + req.session.patientID + '.json';
  let patientSchedule = JSON.parse(fs.readFileSync(fileName));

  patientSchedule = patientSchedule.filter(item => {
    return !(item.startTime === req.body.startTime && (new Date(item.date)).getTime() === (new Date(req.body.date)).getTime() && item.doctor_id === req.body.doctor_id);
  });
  
  patientSchedule.sort((a, b) =>  (a.startTime < b.startTime )? 1 : -1).sort((a, b) => (new Date(a.date) > new Date(b.date)) ? 1 : -1)
  fs.writeFileSync(fileName, JSON.stringify(patientSchedule, null, 2) + '\n');

  const fileNameDoctor = '../halodoc/src/database/appointment/doctor/' + req.body.doctor_id + '.json';
  
  let doctorSchedule = JSON.parse(fs.readFileSync(fileNameDoctor));

  doctorSchedule = doctorSchedule.filter(item => {
    return !(item.patient_id === req.session.patientID && item.startTime === req.body.startTime && (new Date(item.date)).getTime() === (new Date(req.body.date)).getTime());
  });

  doctorSchedule.sort((a, b) =>  (a.startTime < b.startTime )? 1 : -1).sort((a, b) => (new Date(a.date) > new Date(b.date)) ? 1 : -1)

  fs.writeFileSync(fileNameDoctor, JSON.stringify(doctorSchedule, null, 2) + '\n');
   
  res.json({data: '/dashboard'})
})


app.post('/doctorCancelAppointment', (req, res) => {

  if (!req.session.doctorID) {
    console.log('Not logged innnn');
    return res.redirect('/doctorlogin');
  }
  // const patient = JSON.parse(fs.readFileSync('../halodoc/src/database/patients.json'))
  // .find(patient => patient.firstName === req.body.patient_name.split(" ")[0] && patient.lastName === req.body.patient_name.split(" ")[1]);
  const fileName = '../halodoc/src/database/appointment/patient/' + req.body.patientID + '.json';

  let patientSchedule = JSON.parse(fs.readFileSync(fileName));

  
  patientSchedule = patientSchedule.filter(item => {
    return !(item.startTime === req.body.startTime && (new Date(item.date)).getTime() === (new Date(req.body.date)).getTime() && item.doctor_id === req.session.doctorID);
    });

  fs.writeFileSync(fileName, JSON.stringify(patientSchedule, null, 2) + '\n');

  const fileNameDoctor = '../halodoc/src/database/appointment/doctor/' + req.session.doctorID + '.json';

  let doctorSchedule = JSON.parse(fs.readFileSync(fileNameDoctor));
  doctorSchedule = doctorSchedule.filter(item => {
    return !(item.startTime === req.body.startTime && (new Date(item.date)).getTime() === (new Date(req.body.date)).getTime() && item.patient_id === req.body.patientID);
  });

  fs.writeFileSync(fileNameDoctor, JSON.stringify(doctorSchedule, null, 2) + '\n');

  res.send('/dashboard');
})

app.post('/makeappointmentbydoctor/:date/:hour', (req, res) => {
  let patients = JSON.parse(fs.readFileSync('../halodoc/src/database/patients.json'))
  if(!req.session.doctorID){
    console.log('Not logged in')
    return res.redirect('/doctorlogin');
  }

  const patient_id = req.body.patientID;
  let dateObj = new Date(req.params.date);  
  const newAppointment = {
    "doctor_id": req.session.doctorID,
    "patient_id": patient_id,
    "startTime": req.params.hour,
    "date": dateObj.toLocaleDateString('en-US', {year: 'numeric', month: '2-digit', day: '2-digit'}),
  };
  const doctorFileName = '../halodoc/src/database/appointment/doctor/' + req.session.doctorID + '.json';
  const patientFileName = '../halodoc/src/database/appointment/patient/' + patient_id + '.json';

  //write the appointment into both files (doctor and patient)
  try {
    let doctorJsonData = fs.readFileSync(doctorFileName);
    var doctorData = JSON.parse(doctorJsonData);
  } catch (error) {
    var doctorData = [];
    console.log('New database initialized.');
  }
  doctorData.push(newAppointment);
  doctorData.sort((a, b) =>  (a.startTime < b.startTime )? 1 : -1).sort((a, b) => (new Date(a.date) > new Date(b.date)) ? 1 : -1)
  fs.writeFileSync(doctorFileName, JSON.stringify(doctorData, null, 2));

  try {
    let patientJsonData = fs.readFileSync(patientFileName);
    var patientData = JSON.parse(patientJsonData);
  } catch (error) {
    var patientData = [];
    console.log('New database initialized for patient.');
  }
  patientData.push(newAppointment);
  patientData.sort((a, b) =>  (a.startTime < b.startTime )? 1 : -1).sort((a, b) => (new Date(a.date) > new Date(b.date)) ? 1 : -1)
  fs.writeFileSync(patientFileName, JSON.stringify(patientData, null, 2));

  res.send('Appointment submitted successfully!');

})


app.get('/docschedule', (req, res) =>{
  let doctors = JSON.parse(fs.readFileSync('../halodoc/src/database/doctors.json'))
  let patients = JSON.parse(fs.readFileSync('../halodoc/src/database/patients.json'))


  if (!req.session.doctorID) {
    console.log('Not logged in');
    return res.redirect('/doctorlogin');
  }
  const fileName = '../halodoc/src/database/appointment/doctor/' + req.session.doctorID + '.json';

  try{
    var doctorSchedule = JSON.parse(fs.readFileSync(fileName));

  }catch(err)
  {
    var doctorSchedule = [];
    console.log('No schedule found');
  }

  const currentDoctorJson = doctors.find((doctor) => doctor.id === req.session.doctorID);
  const currentDoctor = JSON.parse(JSON.stringify(currentDoctorJson));

  return res.json({currentDoctor: currentDoctor, doctorSchedule: doctorSchedule, patients: patients});

})


app.get('/schedule/:id', (req, res) => {
  let patients = JSON.parse(fs.readFileSync('../halodoc/src/database/patients.json'))
  if (!req.session.patientID) {
      return res.redirect('/patientlogin');
    }

  const patient = patients.find((patient) => patient.id === req.session.patientID)

  const fileName = '../halodoc/src/database/appointment/doctor/' + req.params.id + '.json';
  const doctorSchedule = JSON.parse(fs.readFileSync(fileName));
  return res.json({data: patient, doctorSchedule: doctorSchedule})
  });


app.post('/editavailability', (req, res) => {
  if(!req.session.doctorID){
    console.log('Not logged in')
    return res.redirect('/doctorlogin');
  }

  const { newStartHour, newStartMinute, newEndHour, newEndMinute, newInterval, newDaysOff } = req.body;
  const doctorID = req.session.doctorID;
  // doctor.startTime = `${hour.padStart(2, '0')}:${minute.padStart(2, '0')}`;

  try{
    
    doctorsData = fs.readFileSync('../halodoc/src/database/doctors.json');
    let doctors = JSON.parse(doctorsData);
    const doctorIndex = doctors.findIndex((doctor) => doctor.id === doctorID);
    const doctor = doctors[doctorIndex]


    doctor.startTime = `${newStartHour.padStart(2, '0')}:${newStartMinute.padStart(2, '0')}`;
    doctor.endTime = `${newEndHour.padStart(2, '0')}:${newEndMinute.padStart(2, '0')}`;

    doctor.appointmentInterval = parseInt(newInterval);
    doctor.dayOffs = newDaysOff;

    fs.writeFileSync('../halodoc/src/database/doctors.json', JSON.stringify(doctors, null, 2) + '\n');

    res.json('/doctordashboard');
  }
  catch(err)
  {
    console.log(err)
    res.json('fail');
  }
});


const PORT = process.env.PORT || 8888;
app.listen(PORT, () => {console.log(`server starting on port ${PORT}`)});
