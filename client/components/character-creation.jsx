import React from 'react';

export default class CharacterCreation extends React.Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {
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
              <div className="flex items-center space-x-3 navbar-item-color font-family-albert-sans navbar-items">
                Characters
              </div>
              <div className="flex items-center space-x-3 navbar-item-color font-family-albert-sans navbar-items">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                </svg>
              </div>
            </div>
          </div>
        </nav>

        <nav className="margin-top-10px navbar-bg-color">
          <div className="bg-gradient-to-r gradient-cotton-candy" />
          <div className="px-8 max-w-6xl mx-auto">
            <div className="flex justify-between">
              <div>
                <h1>Character Creation</h1>
              </div>
            </div>
          </div>
        </nav>

        <div id="character-creation-form">
          <div className="w-full max-w-xs inline-block margin-0-auto items-center justify-center" id="registration-form">
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
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
                />
              </div>
              <div className="mb-6">
                <label htmlFor="cars">Choose Race</label>
                <div />
                <select id="race" name="race">
                  <option value="human">Human</option>
                  <option value="elf">Elf</option>
                  <option value="dragonborn">Dragonborn</option>
                </select>
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Class
                </label>
                <input className="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' : 'shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="password"
                />
              </div>
              <div className="text-align-center">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focuse:outline-none focus:shadow-outline" type="button" onClick={this.handleSubmit}>
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
