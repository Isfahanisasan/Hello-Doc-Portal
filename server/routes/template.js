const express = require('express');
const router = express.Router();
const doctors = require('../../halodoc/src/database/doctors.json');

router.get('/', (req, res) => {
  // Do some thing
});

router.post('/', async (req, res) => {
  // Do something
});

module.exports = router;