const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
  req.session.doctorID = null; // deletes the patientID property from the session object
  console.log('Post logout')
  res.json({data: '/doctorlogin'});
});

module.exports = router;



