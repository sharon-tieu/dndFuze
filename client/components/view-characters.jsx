import React from 'react';
import axios from 'axios';

export default class ViewCharacters extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loadData: true,
      characters: []
    };
  }

  componentDidMount() {
    const token = window.localStorage.getItem('react-context-jwt');
    axios
      .get('/api/character', {
        headers: {
          'X-Access-TOKEN': token
        }
      })
      .then(res => {
        setTimeout(
          () => {
            this.setState({
              characters: res.data,
              loadData: false
            });
          }, 2000);
      })
      .catch(err => {
        console.log('ERROR:', err);
      });
  }

  render() {
    return (
      <div>
        { this.state.characters.map(character => {
          return (
            <Link key={character.characterId}
                  to={`/characters/${character.characterId}`}>
              <div
                  style={{ gap: '5px' }}
                  className="flex font-family-alber-san font-bold margin-top-10px">
                <div className="w-2/3 max-w-xs inline-block margin-0-auto justify-center character-card bg-cyan-500 shadow-lg shadow-cyan-500/50 rounded-lg padding-20px">
                  <div className="mb-2">
                    <h3 className="text-gray-700">Character Name:</h3>
                    <h3 className="text-gray-700">{character.characterName}</h3>
                  </div>
                </div>
              </div>
            </Link>
          );
        })
      }
      </div>
    );
  }
}
