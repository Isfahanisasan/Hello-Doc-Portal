import React, {useState} from 'react';
import Select from 'react-select';
import axios from 'axios';



const EditAvailbility = () => {
    // let{day} = useParams();
    // let{month} = useParams();
    // let{year} = useParams();
    // let{hour} = useParams();

    const [error, setError] = useState('');

    const [formValues, setFormValues] = useState({
        newStartHour: '',
        newStartMinute: '',
        newEndHour: '',
        newEndMinute: '',
        newInterval: '',
        newDaysOff: [],

    });
    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setFormValues({
            ...formValues,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
            e.preventDefault(); 
    
            try{
              const response = await axios.post(`editavailability`, formValues);
    
                console.log(response.data);
                if(response.status === 200){
                console.log('successful')
                } else {
                    setError('There was an error with your availability modification')
                }
            }
            catch (err){
              console.error(err);
              setError('There was an error with your signup')
            }




        
    };
    const handleDaysOffChange = (selectedOptions) => {
        const selectedValues = selectedOptions.map(option => option.value);
        setFormValues({
          ...formValues,
          newDaysOff: selectedValues
        });
      };

    const options = [
        { value: 1, label: 'Monday' },
        { value: 2, label: 'Tuesday' },
        { value: 3, label: 'Wednesday' },
        { value: 4, label: 'Thursday' },
        { value: 5, label: 'Friday' },
        { value: 6, label: 'Saturday' },
        { value: 0, label: 'Sunday' },

      ]

        return(

        <div>
            <section>
              <div className="editAvail">
                <h1 >Change your start time, end time, days off and appointment intervals here</h1>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="newStartHour">Start Time Hour:</label><br />
                    <input type="number" id="newstarthour" name="newStartHour" min="0" max="23" value={formValues.newStartHour} onChange={handleInputChange} required/><br />
                     
                    <label htmlFor="newStartMinute">Start Time Minute:</label><br />
                    <input type="number" id="newstartminute" name="newStartMinute" min="0" max="59" step="10" value={formValues.newStartMinute} onChange={handleInputChange} required/><br />

                    <label htmlFor="newEndHour">End Time Hour:</label><br />
                    <input type="number" id="newendhour" name="newEndHour" min="0" max="23" value={formValues.newEndHour} onChange={handleInputChange} required/><br />
                     
                    <label htmlFor="newEndMinute">End Time Minute:</label><br />
                    <input type="number" id="newendminute" name="newEndMinute" min="0" max="59" step="10" value={formValues.newEndMinute} onChange={handleInputChange} required/><br />

                    <label htmlFor="newinterval">Appointment Interval in minutes:</label><br />
                    <input type="number" id="newinterval" name="newInterval" min="0" max="90" step="10" value={formValues.interval} onChange={handleInputChange} required/><br />

                    <label htmlFor="newDaysOff">Select your days off:</label><br />
                    <Select options={options} isMulti onChange={handleDaysOffChange} required/>
        
                    <button type="submit">Submit</button>
                </form>
              </div>
            </section>

            <section>
              <div className ="text1">
              <h1>Provide strightforwad,fast medical appointment service</h1>
              <br/><br/>
              <h2>Save your Time and checky your appointment calendar Conveniently </h2> <br/>


              </div>
            </section>     

          </div>

        )
}


export default EditAvailbility;