import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import '../../Styles/Styles.design.scss';

const UserItem = ({
  user: { firstName, email, number, id, specialty, ava_url },
}) => {
  return (
    <div className='listInfo'>
      <div style={{ margin: '10px' }}></div>
      <img
        src={ava_url}
        alt=''
        className='round-img'
        style={{ width: '60px' }}
      />

      <h3>{firstName}</h3>
      <h3> email: {email}</h3>
      <h3>phone: {number}</h3>
      <h3>Specialty:specialty</h3>
      <Link to={`/doctors/${id}`}>
        <button className='profile2'>More</button>
      </Link>
      <div style={{ margin: '10px' }}></div>

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
