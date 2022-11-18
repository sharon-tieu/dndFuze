import React from 'react';
import axios from 'axios';

// import CharacterCreation from './character-creation';

export default class ViewCharacters extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      characters: []
    };
  }

  componentDidMount() {
    const token = window.localStorage.getItem('react-context-jwt');

    axios.get('/api/character', {
      params: {
        userId: 1
      },
      headers: {
        'X-Access-TOKEN': token
      }
    })
      .then(res => {
        // console.log('server response:', res);
        this.setState({
          characters: res.data
        });
      })
      .catch(err => {
        console.log('ERROR:', err);
      });
  }

  render() {
    console.log('STATE:', this.state);

    return (
      <div>
        <nav className="navbar-bg-color">
          <div className="bg-gradient-to-r gradient-cotton-candy" />
          <div className="px-8 max-w-6xl mx-auto">
            <div className="flex justify-between">
              <div>
                <a href="#" className="flex items-center py-2 px-3 navbar-item-color font-family-alber-sans">
                  <svg className="h-6 w-6 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
                  </svg>
                  <span>DnDFuze</span>
                </a>
              </div>

              <a href='#view-characters' className="flex items-center space-x-3 navbar-item-color font-family-albert-sans navbar-items">
                Characters
              </a>
              <div className="flex items-center space-x-3 navbar-item-color font-family-albert-sans navbar-items">
                <svg xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                </svg>
              </div>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}
