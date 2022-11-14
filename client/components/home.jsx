import React from 'react';
import NavBar from '../components/nav-bar';
import SignUpForm from '../components/create-account';
import SignInForm from '../components/sign-in';
import './styles.css';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 'register'
    };
    this.pageNavigate = this.pageNavigate.bind(this);
  }

  pageNavigate(route) {
    if (route === 'sign-in') {
      this.setState({ currentPage: 'sign-in' });
    } else {
      this.setState({ currentPage: 'register' });
    }
  }

  render() {
    console.log('this.state:', this.state);
    return (
      <div className="h-100 bg-purple">
        <NavBar pageNavigate={ this.pageNavigate } />
        { this.state.currentPage === 'register' ? <SignUpForm /> : this.state.currentPage === 'sign-in' ? <SignInForm /> : null }
      </div>
      // <CharacterCreation />
    );
  }
}
