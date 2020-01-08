import axios from 'axios';

export const getAddress = async () => {
  const response = await axios.post(process.env.REACT_APP_URL_ADDRESS);
  return response.data;
};

export const getEmails = async () => {
  const response = await axios.get(process.env.REACT_APP_URL_EMAILS);
  return response.data;
};

export const getEmailUrl = async () => {
  const response = await axios.get('http://localhost:3001/addresses/teddyleung/emails/1');
  const EmailUrl = response.data.storage_url;
  return EmailUrl;
};

export const getRawEmail = async () => {
  const url = await getEmailUrl();
  const response = await axios.get(url)
  const rawEmail = response.data
  return rawEmail;
}


