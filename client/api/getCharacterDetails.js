import axios from 'axios';

export const getCharacterDetails = characterId => axios.get(`/api/characters/${characterId}`);
