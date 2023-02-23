import React, {useState, useEffect} from 'react';

const PatientSignup = () => {
    const [backendData, setBackendData] = useState({})
    useEffect(() => {
    fetch("/api").then(
      response => response.json()
    ).then(
      data => {
        setBackendData(data)
      }
    )
    }, [])

    return(
        <div>
            {(typeof backendData.msg === 'undefined') ? (
                <p>Loading....</p>  
            ) : (
                <p> {backendData.msg} </p>
            )}
        </div>
    )
}

export default PatientSignup