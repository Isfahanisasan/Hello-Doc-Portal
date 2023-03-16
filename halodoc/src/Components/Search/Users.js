import React from 'react';
import UserItem from './UserItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import '../../Styles/Styles.PatientUpcoming.scss'


const Users = ({ users, loading }) => {
  if (loading) {
    return <Spinner />
  } else {
    return (
      <div className='userStyle'>
        <div className="container text-center">
          <div className='row justify-content-center'>
            {users.map((user,i) => (
              <div className='col-lg-4' key={i}>
                <UserItem key={user.id} user={user} />
              </div>
            ))}
          </div>
        </div>


      </div>
    );
  }
};

Users.propTypes = {
  users: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired
}



export default Users;
