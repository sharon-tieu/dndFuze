import React from 'react';
import axios from 'axios';

export default class stats extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      upArrowClicked: false,
      downArrowClicked: false,
      statValues: {
        level: 1,
        wisdom: 1,
        strength: 1,
        speed: 1,
        charisma: 1
      }
    };
    this.upArrowClicked = this.upArrowClicked.bind(this);
  }

  upArrowClicked(event) {
    this.setState({
      upArrowClicked: true
    });
    const config = {
      headers: {
        'X-Access-Token': localStorage.getItem('react-context-jwt')
      }
    };
    axios.post('/api/character', this.state.statValues, config)
      .then(res => {
        this.setState({
          statValues.level = statValues.level + 1,
          statValues.wisdom = statValues.wisdom + 1,
          statValues.strength = statValues.strength + 1,
          statValues.speed = statValues.speed + 1,
          statValues.charisma = statValues.charisma + 1
        });
      })
      .catch(err => {
        console.log('res.err:', err)
      });
  }

 downArrowClicked(event) {
    this.setState({
     downArrowClicked: true
    });
    const config = {
      headers: {
        'X-Access-Token': localStorage.getItem('react-context-jwt')
      }
    };
    axios.post('/api/character', this.state.statValues, config)
      .then(res => {
        this.setState({
          statValues.level = statValues.level - 1,
          statValues.wisdom = statValues.wisdom - 1,
          statValues.strength = statValues.strength - 1,
          statValues.speed = statValues.speed - 1,
          statValues.charisma = statValues.charisma - 1
        });
      })
      .catch(err => {
        console.log('res.err:', err)
      });
  }

}
