import React from 'react';
import jwtDecode from 'jwt-decode';
import NavBar from './components/nav-bar';
import parseRoute from './pages/parse-route';
import Home from './components/home';
import CharacterCreation from './components/character-creation';
import ViewCharacters from './components/view-characters';
import NotFound from './pages/not-found';
import AppContext from './lib/app-context';
import CharacterSheet from './components/character-sheet';
import { Routes, Route, Outlet, Link, BrowserRouter as Router } from 'react-router-dom';
import { urls } from './constants/urls';
import SignInForm from './components/sign-in';
import SignUpForm from './components/create-account';
// import SignOut from './components/sign-out';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      isAuthorizing: true,
      route: parseRoute(window.location.hash)
    };
    this.handleSignIn = this.handleSignIn.bind(this);
    this.handleSignOut = this.handleSignOut.bind(this);
  }

  componentDidMount() {
    /**
    * Listen for hash change events on the window object
    * Each time the window.location.hash changes, parse
    * it with the parseRoute() function and update state
    */
    window.addEventListener('hashchange', () => {
      this.setState({
        route: parseRoute(window.location.hash)
      });
    });
    const token = window.localStorage.getItem('react-context-jwt');
    const user = token ? jwtDecode(token) : null;
    this.setState({ user, isAuthorizing: false });
  }

  handleSignIn(result) {
    const { user, token } = result;
    window.localStorage.setItem('react-context-jwt', token);
    this.setState({ user });
  }

  handleSignOut() {
    window.localStorage.removeItem('react-context-jwt');
    this.setState({ user: null });
  }

  // renderPage() {
  //   const { route } = this.state;

  //   if (route.path === '') {
  //     return <Home />;
  //   }
  //   if (route.path === 'sign-in' || route.path === 'sign-up') {
  //     return <NavBar />;
  //   }
  //   if (route.path === 'user-character') {
  //     return <CharacterCreation />;
  //   }
  //   if (route.path === 'view-characters') {
  //     return <ViewCharacters />;
  //   }
  //   if (route.path === 'character-sheet') {
  //     return <CharacterSheet />;
  //   }
  //   return <NotFound />;
  // }

  render() {
    if (this.state.isAuthorizing) return null;
    const { user, route } = this.state;
    const { handleSignIn, handleSignOut } = this;
    const contextValue = { user, route, handleSignIn, handleSignOut };
    return (
      <AppContext.Provider value={contextValue}>

        <Router >
          <AppContext.Consumer>
            {({ user, handleSignOut }) => <NavBar isLoggedIn={!!user} handleSignOut={handleSignOut} />}
          </AppContext.Consumer>
          <Routes>
            <Route path='/' element={<SignUpForm/>} />
            <Route path='/register' element={<SignUpForm />} />
            <Route path='/sign-in' element={<SignInForm />} />
            <Route path='/characters/create' element={<CharacterCreation/>} />
            <Route path='/characters' element={<ViewCharacters/>} />
            <Route path={ urls.characterSheet() } element={<CharacterSheet />} />
            {/* <Route path='/sign-out' element={<SignOut />} /> */}
          </Routes>
        </Router>

        {/*
          query parameter: www.google.com/mail?dateAfter=11034242&hello=123
          app.com/character/123/details
        */}

      </AppContext.Provider>
    );
  }
}
