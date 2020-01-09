import axios from 'axios';

// TODO: Only want one env var REACT_APP_URL=http://localhost:3001

export const getAddress = async () => {
  const response = await axios.post(process.env.REACT_APP_URL + '/addresses');
  return response.data;
};
//pass in adress to get emails
export const getEmails = async (addressId) => {
  const response = await axios.get(process.env.REACT_APP_URL + `/addresses/${addressId}/emails`);
  return response.data;
};

export const deleteEmail = async (addressId, id) => {
  const response = await axios.delete(process.env.REACT_APP_URL + `/addresses/${addressId}/emails/${id}`)
  return response.data;
}
// TODO
// getEmailUrl(addressId, id)
export const getEmailUrl = async (addressId, id) => {
  const response = await axios.get(process.env.REACT_APP_URL + `/addresses/${addressId}/emails/${id}`);
  return response.data.storage_url;
};

// TODO
// getRawEmail(addressId, id)
export const getRawEmail = async (addressId, id) => {
  const url = await getEmailUrl(addressId, id);
  const response = await axios.get(url);
  return response.data;
};
