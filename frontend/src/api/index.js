import axios from 'axios';


// TODO: Only want one env var REACT_APP_URL="http://localhost:3000"

export const getAddress = async () => {
  const response = await axios.post(process.env.REACT_APP_URL_ADDRESS);
  return response.data;
};

export const getEmails = async () => {
  const response = await axios.get(process.env.REACT_APP_URL_EMAILS);
  return response.data;
};

// TODO
// getEmailUrl(addressId, id)
export const getEmailUrl = async () => {
  const response = await axios.get(process.env.REACT_APP_URL_EMAIL + `/addresses/${addressId}/emails/${id}`);
  return response.data.storage_url;
};

// TODO
// getRawEmail(addressId, id)
export const getRawEmail = async () => {
  const url = await getEmailUrl();
  const response = await axios.get(url);
  return response.data;
};
