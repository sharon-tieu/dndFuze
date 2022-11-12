import React from 'react';

export default class SignUpForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUsernameInsert = this.handleUsernameInsert.bind(this);
    this.handlePasswordInsert = this.handlePasswordInsert.bind(this);
  }

  handleUsernameInsert(event) {
    this.setState({ username: event.target.value });
  }

  handlePasswordInsert(event) {
    this.setState({ password: event.target.value });
  }

  handleSubmit(event) {
    // console.log('state:', this.state);
    event.preventDefault();
  }

  render() {

    return (
      <div className="w-full max-w-xs inline-block margin-0-auto align-items-center">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h1 className="text-3xl hover:text-base text-center margin-bottom-7px">
            Register
          </h1>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username">
              Username
            </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="Username"/>
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password">
              Password
            </label>
            <input className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="**********" />
            <p className="text-red-500 text-xs italic margin-top-5px">Please choose a password.</p>
          </div>
          <div className="text-align-center">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focuse:outline-none focus:shadow-outline" type="button">
              Sign Up
            </button>
          </div>
        </form>
      </div>
    );
  }
}
