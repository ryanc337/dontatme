import axios from 'axios';

export const getAddress = async () => {
  const response = await axios.post(process.env.REACT_APP_URL_ADDRESS);
  return response.data;
};

export const getEmails = async () => {
  const response = await axios.get(process.env.REACT_APP_URL_EMAILS);
  return response.data;
};
