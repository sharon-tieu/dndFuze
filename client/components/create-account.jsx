import React from 'react';
import axios from 'axios';

export default class SignUpForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUsername = this.handleUsername.bind(this);
    this.handlePasswordInsert = this.handlePasswordInsert.bind(this);
  }

  handleUsername(event) {
    this.setState({ username: event.target.value });
  }

  handlePasswordInsert(event) {
    this.setState({ password: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();

    axios
      .post('/api/auth/sign-up',
        {
          username: this.state.username,
          password: this.state.password
        })
      .then(res => {
        this.setState({ username: '', password: '' });
      })
      .catch(err => {
        console.log('res.err:', err);
      });
  }

  render() {
    return (
      <div>
        <div id="registration-form-container">
          <div className="w-full max-w-xs inline-block margin-0-auto items-center justify-center" id="registration-form">
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
              <h1 className="text-3xl hover:text-base text-center margin-bottom-7px">
                Register
              </h1>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="username">
                  username
                </label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="username"
                  value={ this.state.username }
                  type="text"
                  placeholder="username"
                  onChange={ this.handleUsername }/>
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="password">
                  Password
                </label>
                <input className={this.state.password === '' ? 'shadow appearance-none border-red-500 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' : 'shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' }
                  id="password"
                  value={ this.state.password }
                  type="password"
                  placeholder="**********"
                  onChange={ this.handlePasswordInsert }/>
                { this.state.password === '' ? <p className="text-red-500 text-xs italic margin-top-5px">Please choose a password.</p> : null }
              </div>
              <div className="text-align-center">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focuse:outline-none focus:shadow-outline" type="button" onClick={ this.handleSubmit }>
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
