import '../../App.css';
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
    return (
      <div className='App'>
        <div className='container'>
          <Navbar />
          <Alert alert={this.state.alert} />
          <Search
            searchUsers={this.searchUsers}
            clearUsers={this.clearUsers}
            showClear={users.length > 0 ? true : false}
            setAlert={this.setAlert}
          />
          <Users loading={loading} users={users} />
          <h1>This is the Home Page!</h1>
        </div>
      </div>
    );
  }
}

export default RunSearch;
