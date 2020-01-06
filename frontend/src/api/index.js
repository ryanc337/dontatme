import axios from 'axios';

export const getAddress = async () => {
  const response = await axios.post('http://localhost:3001/addresses')
  return response.data;
}

export const getEmails = async () => {
  const response = await axios.get('http://localhost:3001/teddyisthegoat')
  return response.data;
}






