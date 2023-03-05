import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../../Styles/Styles.design.scss'
export class Search extends Component {
  state = {
    text: '',
  };

  static propTypes = {
    searchUsers: PropTypes.func.isRequired,
    clearUsers: PropTypes.func.isRequired,
    showClear: PropTypes.bool.isRequired,
    setAlert: PropTypes.func.isRequired,
  };

  onSubmit = (e) => {
    e.preventDefault();
    if (this.state.text === '') {
      this.props.setAlert('Please enter something');
    } else {
      this.props.searchUsers(this.state.text);
      this.setState({ text: '' });
    }
  };

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  render() {
    const { showClear, clearUsers } = this.props;

    return (
      <div className='search'>
        <h3>Search Medical Service!</h3>
        <form onSubmit={this.onSubmit} className='form'>
          <div className='searchBox'>
            <div className='textInput'>
              <input
                type='text'
                name='text'
                placeholder='Search for Doctors...'
                value={this.state.text}
                onChange={this.onChange}
              />
          </div>
          <div className='submitButton'>
            <input
              type='submit'
              name='Search'
              className='btn btn-dark btn-block'
            />
          </div>
        </div>
        </form>

        {showClear && (
          <button className='btn tbn-light btn-block' onClick={clearUsers}>
            Clear
          </button>
        )}
        </div>
    );
  }
}

export default Search;
