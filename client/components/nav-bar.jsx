import React from 'react';
import RegisterOrSignInNavbar from './register-or-sign-in-Navbar';
import CharacterNavbar from './character-navbar';

export default class NavBar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return this.props.isLoggedIn ? <CharacterNavbar /> : <RegisterOrSignInNavbar />;
  }

}
