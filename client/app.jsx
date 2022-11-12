import React from 'react';
import NavBar from './components/nav-bar';
import parseRoute from './pages/parse-route';
import Home from './components/home';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      route: parseRoute(window.location.hash)
    };
  }

  componentDidMount() {
    window.addEventListener('hashchange', () => {
      const route = window.location.hash;
      const parsedRoute = parseRoute(route);

      this.setState({
        route: parsedRoute
      });
    });
  }

  renderPage() {
    const { route } = this.state;
    if (route.path === 'home') {
      return <NavBar />;
    }
    if (route.path === '') {
      return <Home />;
    }
  }

  render() {
    return this.renderPage();
  }
}
