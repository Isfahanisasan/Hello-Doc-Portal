const express = require('express');
const router = express.Router();
const fs = require('fs');
const hashHelper = require('../helper/hashHelper.js');

router.post('/', async (req, res) => {
  let doctors = JSON.parse(fs.readFileSync('../halodoc/src/database/doctors.json'))

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
  let newDoctorId = (lastDoctorId + 1).toString();
  let link = ''
  if (formData.gender === 'male'){
    link= `https://xsgames.co/randomusers/assets/avatars/male/${newDoctorId}.jpg`
  }
  else if (formData.gender === 'female'){
    link= `https://xsgames.co/randomusers/assets/avatars/female/${newDoctorId}.jpg`
  }
  else{
    link=`https://xsgames.co/randomusers/assets/avatars/pixel/${newDoctorId}.jpg`
  }

  const hassPassword = await hashHelper.hashPassword(formData.password);
  const newDoctor = {
    ava_url: link,
    id: newDoctorId,
    ...formData,
    startTime: "09:00",
    endTime: "17:00",
    appointmentInterval: 30,
    dayOffs: [
      0,
      6
    ],
    password: hassPassword
  };
  data.push(newDoctor);
  fs.writeFileSync('../halodoc/src/database/doctors.json', JSON.stringify(data, null, 2) + '\n');
  const newFile = '../halodoc/src/database/appointment/doctor/' + newDoctor.id + '.json'
  fs.writeFile(newFile, JSON.stringify([]), err => {
    if (err) {
      console.error(err);
      return;
    }
  })
  res.json({data: '/doctorlogin'})

});

module.exports = router;
