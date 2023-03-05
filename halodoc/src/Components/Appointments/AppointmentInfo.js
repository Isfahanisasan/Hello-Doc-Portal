import '../../Styles/Styles.design.scss'
const AppointmentInfo = (appointment) => {
    const styles = {
        width: '300px',
        border: '1px solid black',
    };
    return(
        <div className='information'>
            <div className='icon'>
            <img src={require("../../Styles/img/calendar_icon.png")} alt="" width="100px" style={{marginTop:"20px", marginLeft:"20px"}} />
            </div>
            <div className='text1'>
                <p>Specialist: {appointment.doctorName} </p>
                <p>Start TIME: {appointment.time} </p>
                <p> DATE: {appointment.date} </p>
            </div>
        </div> 
    )
}

export default AppointmentInfo