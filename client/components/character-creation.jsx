import React from 'react';
import axios from 'axios';

export default class CharacterCreation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showForm: true,
      createClicked: false,
      formValues: {
        characterName: '',
        characterRace: '',
        characterClass: '',
        characterStartingWeapon: '',
        characterPersonality: ''
      }
    };
    this.handleCharacterSubmit = this.handleCharacterSubmit.bind(this);
    this.updateForm = this.updateForm.bind(this);
  }

  updateForm(event, key) {
    this.setState({
      formValues: {
        ...this.state.formValues,
        [key]: event.target.value
      }
    });
  }

  handleCharacterSubmit(event) {
    const config = {
      headers: {
        'X-Access-Token': localStorage.getItem('react-context-jwt')
      }
    };

    axios
      .post('/api/character', this.state.formValues, config)
      .then(res => {
        this.setState({
          showForm: true,
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
    const createForm = this.state.createClicked ? 'hide' : '';

    return (
      <div>
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
                  Species
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
            </form>
          </div>
        </div>
      </div>
    );
  }
}
