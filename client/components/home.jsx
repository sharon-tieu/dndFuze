import React from 'react';
import NavBar from '../components/nav-bar';
import SignUpForm from '../components/create-account';

export default function Home() {
  return (
    <div className="vh-100 bg-purple">
      <NavBar />
      <SignUpForm />

    </div>
  );
}
