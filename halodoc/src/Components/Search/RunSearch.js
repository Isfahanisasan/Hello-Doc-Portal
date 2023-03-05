import '../../Styles/Search.scss';
import React, { Component, Fragment } from 'react';
import Search from './Search';
import About from './About';
import Navbar from './Navbar';
import Doctors from '../../database/doctors.json';
import Users from './Users';
import Alert from './Alert';

class RunSearch extends Component {
  state = {
    users: [],
    user: {},
    loading: false,
    alert: null,
  };

  searchUsers = (text) => {
    const doctors = JSON.parse(JSON.stringify(Doctors));

    // const doctor = doctors.filter((doctor) => doctor.firstName.toLowerCase().includes(text));
    const doctor = doctors.filter((doctor) => doctor.firstName === text);
    this.setState({ users: doctor, loading: false });
    console.log(doctor);
  };

  //clear users from state
  clearUsers = () => this.setState({ users: [], loading: false });

  //set Alert
  setAlert = (msg) => {
    this.setState({ alert: { msg } });
    //make it go away after 3 sec
    setTimeout(() => this.setState({ alert: null }), 3000);
  };

  

  render() {
    const { users, user, loading } = this.state;
    // console.log("Hello");
    return (
      <div className='RunSearch'>
        <div className='container1'>
          <Alert alert={this.state.alert} />
          <Search
            searchUsers={this.searchUsers}
            clearUsers={this.clearUsers}
            showClear={users.length > 0 ? true : false}
            setAlert={this.setAlert}
          />
          <Users loading={loading} users={users} />
        </div>
      </div>
    );
  }
}

export default RunSearch;
