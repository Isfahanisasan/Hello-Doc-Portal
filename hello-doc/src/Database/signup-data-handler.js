//I'm using filesystems from Json to write to files
const fs = require('fs');
//Express to create a new web server to handle requests and responses 
const express = require('express');
//Body-Parser to Parse the data received from patients in form of a map
const bodyParser = require('body-parser');

//create a server
const app = express();
//extended: false specifies thatuse classic algorithm --key&values eg: 
//key:'firstname' value: "sasan"
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('../Front-end\ pages/'));

//provider signup 
app.post('/submit-form-provider', (req, res) => {
    const formData = req.body;
    console.log(formData);
  
    // Save the updated data to doctor.json file
    fs.appendFile('./doctors.json', JSON.stringify(formData, null, 1) + '\n', (err) => {
      if (err) {
        console.log('Error appending to doctors.json:', err.message);
        return res.status(500).send('Error appending to doctors.json');
      }
      console.log('Data appended to doctors.json');
      res.send('Form submitted successfully!');
    });
  });


//patient signup
app.post('/submit-form-patient', (req, res) => {
  const formData = req.body;
  console.log(formData);
  fs.appendFile('./patients.json', JSON.stringify(formData, null, 1) + '\n', (err) => {
    if (err) {
      console.log('Error appending to patients.json:', err.message);
      return res.status(500).send('Error appending to patients.json');
    }
    console.log('Data appended to patients.json');
    res.send('Form submitted successfully!');
  });


  // Save the updated data to patient.json file

});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});