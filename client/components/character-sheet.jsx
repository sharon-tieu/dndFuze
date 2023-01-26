import React from 'react';
import axios from 'axios';
import { matchPath } from 'react-router';
import { Link } from 'react-router-dom';
import LoadingSpinner from './loading-spinner';

class CharacterSheet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openId: null,
      loadData: true
    };
    this.handleDecrement = this.handleDecrement.bind(this);
    this.handleIncrement = this.handleIncrement.bind(this);
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
        // this.setState({
        //   loadData: false,
        //   character: res.data
        // });
        setTimeout(() => {
          this.setState({
            characters: res.data,
            loadData: false,
            wisdom: res.data[0].wisdom,
            strength: res.data[0].strength,
            speed: res.data[0].speed,
            charisma: res.data[0].charisma
          });
        }, 2000);
      })
      .catch(err => {
        console.log('ERROR:', err);
      });
  }

  handleDecrement(characterStats) {
    this.setState({
      ...this.state,
      [characterStats]: this.state[characterStats] - 1
    });
  }

  handleIncrement(characterStats) {
    this.setState({
      ...this.state,
      [characterStats]: this.state[characterStats] + 1
    });
  }

  render() {
    console.log('STATE:', this.state);
    if (this.state.loadData) {
      return <LoadingSpinner />;
    }

    console.log('this.state.character:', this.state.characters);
    return (
      <div>
        <h1 className="hover-cursor text-center mt-6 m-8 font-bold font-family-alber-san text-2xl">
          Character Sheet
        </h1>
        <h1 className="hover-cursor text-center mt-6 m-8 font-bold font-family-alber-san text-2xl character-name">
          {this.state.characters[0].characterName === undefined ? null : this.state.characters[0].characterName }
        </h1>
        <div className="text-center p-3 hover-cursor">
          <p className="mb-2">
            Stats
          </p>
          <div className="gap-6 inline-grid grid-cols-5 justify-center hover-cursor p-5">
            <p className="mt-3">
              Level
            </p>
            <p className="mt-3">
              Wisdom
            </p>
            <p className="mt-3">
              Strength
            </p>
            <p className="mt-3">
              Speed
            </p>
            <p className="mt-3">
              Charisma
            </p>
            <div className="flex justify-center items-center border-solid border-2 rounded border-grey-600 w-20 mr-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="mr-2 w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
              <p className="mr-2">
                { this.state.characters[0].level }
              </p>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
              </svg>
            </div>
            <div className="flex justify-center items-center border-solid border-2 rounded border-grey-600 w-20 mr-2">
              <svg xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="mr-2 w-4 h-4"
                    onClick={ () => this.handleDecrement('wisdom') }>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
              <p className="mr-2">
                { this.state.wisdom }
              </p>
              <svg xmlns="http://www.w3.org/2000/svg"
                  fill="none" viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-4 h-4"
                  onClick={ () => this.handleIncrement('wisdom') }>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
              </svg>
            </div>
            <div className="flex justify-center items-center border-solid border-2 rounded border-grey-600 w-20 mr-2">
              <svg xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="mr-2 w-4 h-4"
                  onClick={ () => this.handleDecrement('strength')}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
              <p className="mr-2">
                {this.state.strength}
              </p>
              <svg xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-4 h-4"
                    onClick={ () => this.handleIncrement('strength')}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
              </svg>
            </div>
            <div className="flex justify-center items-center border-solid border-2 rounded border-grey-600 w-20 mr-2">
              <svg xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="mr-2 w-4 h-4"
                    onClick={() => this.handleDecrement('speed') }>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
              <p className="mr-2">
                {this.state.speed}
              </p>
              <svg xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-4 h-4"
                    onClick={ () => this.handleIncrement('speed') }>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
              </svg>
            </div>
            <div className="flex justify-center items-center border-solid border-2 rounded border-grey-600 w-20 mr-2">
              <svg xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="mr-2 w-4 h-4"
                    onClick={ () => this.handleDecrement('charisma')}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
              <p className="mr-2">
                {this.state.charisma}
              </p>
              <svg xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-4 h-4"
                    onClick={ () => this.handleIncrement('charisma') }>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
              </svg>
            </div>

          </div>
        </div>
        <div className="text-center p-3 border-solid hover-cursor">
          <p>
            HP / Max HP
          </p>
          <div className="flex justify-center mt-2">
            <div className="border-solid border-2 rounded border-grey-600 w-20 mr-2">
              1
            </div>
            <p className="text-albert-sans">
              &#47;
            </p>
            <div className="border-solid border-2 rounded-md border-grey-600 w-20 ml-2">
              1
            </div>
          </div>
        </div>
        <div className="flex text-left p-5 place-content-center space-x-5 p-10">
          <div className="hover-cursor mr-20">
            <p>
              Class&#58; { this.state.characters[0].characterClass }
            </p>
            <p>
              Species&#58; { this.state.characters[0].characterRace }
            </p>
            <p>
              Starting Weapon&#58; { this.state.characters[0].characterStartingWeapon }
            </p>
            <p>
              Personality&#58; { this.state.characters[0].characterPersonality }
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default CharacterSheet;
// allows access to Line 22
