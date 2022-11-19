import React from 'react';
import CharacterCreation from './character-creation';

export default class AppDrawer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isClicked: false,
      createClicked: false
    };
    this.handleAppDrawerClick = this.handleAppDrawerClick.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleAppDrawerClick() {
    // console.log('detected!');
    this.setState({ isClicked: !this.state.isClicked });
  }

  handleClick() {
    this.setState({ isClicked: !this.state.isClicked });
  }

  render() {
    let appDrawer = 'M12 4.5v15m7.5-7.5h-15';
    let modal = 'hide';
    let visibility = 'hide';
    if (this.state.isClicked) {
      appDrawer = 'M6 18L18 6M6 6l12 12';
      modal = 'modal-bg-grey';
      visibility = 'visibile';
    }

    return (
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
              d={appDrawer}
            />
          </svg>
          <div className={visibility}>
            <a
              href="#create"
              className="margin-top-20px padding-10px menu-item-hover-underline duration-700"
              >
              Create
            </a>
          </div>
        </div>

        <div className={modal}>
          <div className="margin-top-10px padding-10px col-70 vh-100" />
        </div>
      </div>

    );
  }
}
