const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
  req.session.patientID = null; // deletes the patientID property from the session object
  console.log('Post logout')
  res.json({data: '/patientlogin'});
});

module.exports = router;



