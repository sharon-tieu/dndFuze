import React from 'react';
import axios from 'axios';
import { matchPath } from 'react-router';
import { Link } from 'react-router-dom';

class CharacterSheet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openId: null
    };
  }

  handleCharacterNameClick(characters) {
    this.setState({
      characterId: characters.characterId.target.value
    });
    console.log(this.state);
  }

  componentDidMount() {
    const viewCharacterInfo = window.localStorage.getItem('react-context-jwt');
    const { characterId } = matchPath(window.location.pathname, {
      path: '/characters/:characterId'
    }).params;
    axios.get('/api/character/details?characterId=' + characterId, {
      headers: {
        'X-Access-TOKEN': viewCharacterInfo
      }
    })
      .then(res => {
        console.log('server response:', res);
        this.setState({
          character: res.data
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
        <p className="text-center mt-6 m-8 font-bold font-family-alber-san">
          this is your character sheet
        </p>
        <div className="text-center p-3 border-solid border-2 border-indigo-600">
          <p>
            HP / Max HP
          </p>
          <div className="flex">
            <div className="border-solid border-2 border-grey-600 w-24">
              1
            </div>
            <div />
            <div className="border-solid border-2 border-grey-600 w-24">
              1
            </div>
          </div>
        </div>
        <div className="flex text-left p-5 place-content-center space-x-5 border-solid border-2 border-indigo-600">
          <div className="border-solid p-3 border-2 border-indigo-600">
            <p>
              Class
            </p>
            <p>
              Race
            </p>
            <p>
              Starting Weapon
            </p>
            <p>
              Personality
            </p>
          </div>
          <div className="items-left border-solid p-4 border-2 border-indigo-600">
            <p>
              Level
            </p>
            <p>
              Strength
            </p>
            <p>
              Wisdom
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default CharacterSheet;
// allows access to Line 22
