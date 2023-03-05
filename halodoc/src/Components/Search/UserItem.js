import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom'
import '../../Styles/Styles.design.scss'

const UserItem = ({user:{firstName, email, number,id,specialty}}) => {
  return (
    <div className='listInfo'>
      {/* <img
        src={avatar_url}
        alt=''
        className='round-img'
        style={{ width: '60px' }}
      /> */}

      <h3>{firstName}</h3>
      <h3> email: {email}</h3>
      <h3>phone: {number}</h3>
      <h3>Specialty:specialty</h3>
      <Link to={(`/doctors/${id}`)}>
          <button className="profile2">
            Click to see more information!
          </button>
      </Link>


      {/* <div>
        <Link to={`/user/${firstname}`} className='btn btn-dark btn-sm my-1'>
          More
        </Link>
      </div> */}
    </div>
  );
};


UserItem.propTypes = {
  user: PropTypes.object.isRequired,
};

export default UserItem;
