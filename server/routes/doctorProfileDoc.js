const express = require('express');
const router = express.Router();
const fs = require('fs');


router.get('/', async (req, res) => {
  let doctors = JSON.parse(fs.readFileSync('../halodoc/src/database/doctors.json'))
  let reviews = JSON.parse(fs.readFileSync('../halodoc/src/database/doctorReviews.json'))


  if (!req.session.doctorID) {
      return res.redirect('/doctorlogin');
    }
  const doctor = doctors.find((doctor) => doctor.id === req.session.doctorID);
  const review = reviews.find((item) => item.doctor_id === req.session.doctorID);
  
  console.log(doctor);
  // console.log(review)
  res.json({data: doctor, reviews: review})
});

module.exports = router;

