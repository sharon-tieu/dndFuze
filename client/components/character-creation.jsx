import React from 'react';
import axios from 'axios';

export default class CharacterCreation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isClicked: false,
      createClicked: false,
      formValues: {
        characterName: '',
        characterRace: '',
        characterClass: '',
        characterStartingWeapon: '',
        characterPersonality: ''
      }
    };
    this.handleAppDrawerClick = this.handleAppDrawerClick.bind(this);
    this.handleCharacterCreationClick = this.handleCharacterCreationClick.bind(this);
    this.handleCharacterSubmit = this.handleCharacterSubmit.bind(this);
    this.updateForm = this.updateForm.bind(this);
  }

  handleAppDrawerClick() {
    // console.log('detected!');
    this.setState({ isClicked: !this.state.isClicked });
  }

  handleCharacterCreationClick() {
    // console.log('create detected');
    this.setState({
      createClicked: !this.state.createClicked,
      isClicked: false
    });
  }

  updateForm(event, key) {
    console.log('WORKING');
    console.log('key:', key);
    console.log('event.target.value:', event.target.value);
    this.setState({
      ...this.state,
      formValues: {
        ...this.state.formValues,
        [key]: event.target.value
      }
    });
  }

  handleCharacterSubmit(event) {
    console.log('character state:', this.state);
    console.log('submit click detected!');
    const config = {
      headers: {
        'X-Access-Token': localStorage.getItem('react-context-jwt')
      }
    };

    console.log('this.state.formvalues:', this.state.formValues);

    axios.post('/api/character', this.state.formValues, config)
      .then(res => {
        console.log('CHAR CREATION RES.DATA:', res.data);
        this.setState({
          formValues: {
            characterName: '',
            characterRace: '',
            characterClass: '',
            characterStartingWeapon: '',
            characterPersonality: ''
          }
        });
      })
      .catch(err => {
        console.log('res.err:', err);
      });
  }

  render() {
    let appDrawer = 'M12 4.5v15m7.5-7.5h-15';
    let modal = 'hide';
    let visibility = 'hide';
    const createForm = this.state.createClicked ? '' : 'hide';
    if (this.state.isClicked) {
      appDrawer = 'M6 18L18 6M6 6l12 12';
      modal = 'modal-bg-grey';
      visibility = 'visibile';
    }

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
              <div />

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

        <div className="row">
          <div className="margin-top-10px padding-10px col-30 vh-100">
            <svg xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                onClick={this.handleAppDrawerClick}
                className="w-6 h-6 app-drawer-closed">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d={ appDrawer }
              />
            </svg>
            <div className={ visibility }>
              <h2
                className="margin-top-20px padding-10px menu-item-hover-underline duration-700"
                onClick={ this.handleCharacterCreationClick }>
                Create
              </h2>
            </div>
          </div>

          <div className={ modal }>
            <div className="margin-top-10px padding-10px col-70 vh-100" />
          </div>
        </div>

        <div id="character-creation-form">
          <div className="w-full max-w-xs inline-block margin-0-auto items-center justify-center" id="registration-form">
            <form className={`${createForm} bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4`}>
              <h1 className="text-3xl hover:text-base text-center margin-bottom-7px">
                Character Creation
              </h1>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="character-creation">
                  Character Name
                </label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  placeholder="character name"
                  value= { this.state.formValues.characterName }
                  onChange = { event => this.updateForm(event, 'characterName') }
                  required
                />
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="race"
                        required>
                  Race
                </label>
                <div />
                <select id="race"
                        name="race"
                        onChange={event => this.updateForm(event, 'characterRace')}
                        value= { this.state.formValues.characterRace }
                        required>
                  <option value="">Select an option</option>
                  <option value="human">Human</option>
                  <option value="elf">Elf</option>
                  <option value="dragonborn">Dragonborn</option>
                </select>
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Class
                </label>
                <select id="class"
                        name="class"
                        onChange={event => this.updateForm(event, 'characterClass')}
                        value= { this.state.formValues.characterClass }
                        required>
                  <option value="">Select an option</option>
                  <option value="warrior">Warrior</option>
                  <option value="cleric">Cleric</option>
                  <option value="assassin">Assassin</option>
                </select>
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Starting Weapon
                </label>
                <select id="weapon"
                        name="weapon"
                        onChange={event => this.updateForm(event, 'characterStartingWeapon')}
                        value={ this.state.formValues.characterStartingWeapon }
                        required>
                  <option value="">Select an option</option>
                  <option value="dagger">Dagger</option>
                  <option value="one-handed axe">One-handed Axe</option>
                  <option value="two-handed sword">Two-handed Sword</option>
                </select>
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Personality
                </label>
                <select id="weapon"
                        name="weapon"
                        onChange={event => this.updateForm(event, 'characterPersonality')}
                        value={ this.state.formValues.characterPersonality }
                        required>
                  <option value="">Select an option</option>
                  <option value="Lawful Good">Lawful Good</option>
                  <option value="Lawful Neutral">Lawful Neutral</option>
                  <option value="Lawful Evil">Lawful Evil</option>
                  <option value="Neutral Good">Neutral Good</option>
                  <option value="Neutral">Neutral</option>
                  <option value="Neutral Evil">Neutral Evil</option>
                  <option value="Chaotic Good">Chaotic Good</option>
                  <option value="Chaotic Neutral">Chaotic Neutral</option>
                  <option value="Chaotic Evil">Chaotic Evil</option>
                </select>
              </div>
              <div className="text-align-center">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focuse:outline-none focus:shadow-outline" type="button"
                      onClick={ this.handleCharacterSubmit }>
                  Submit
                </button>
              </div>

              {/* <h1 className="padding-20px text-3xl hover:text-base text-center margin-bottom-7px">
                Created!
              </h1>
              <div>
                <div className="text-center">

                  <svg xmlns="http://www.w3.org/2000/svg"
                    fill="none" viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 display-inline">
                    <path strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
              </div> */}
            </form>
          </div>
        </div>
      </div>
    );
  }
}
