import axios from 'axios';

export const getAddress = async () => {
  const response = await axios.post(process.env.REACT_APP_URL + '/addresses');
  return response.data;
};

export const getEmails = async (addressId) => {
  const response = await axios.get(process.env.REACT_APP_URL + `/addresses/${addressId}/emails`);
  return response.data;
};

export const deleteEmail = async (addressId, id) => {
  const response = await axios.delete(process.env.REACT_APP_URL + `/addresses/${addressId}/emails/${id}`)
  return response.data;
}

export const getEmailUrl = async (addressId, id) => {
  const response = await axios.get(process.env.REACT_APP_URL + `/addresses/${addressId}/emails/${id}`);
  return response.data.storage_url;
};

export const getRawEmail = async (addressId, id) => {
  const url = await getEmailUrl(addressId, id);
  const response = await axios.get(url);
  return response.data;
};

export const updateEmailIsRead = async (addressId, id) => {
  axios.put(process.env.REACT_APP_URL + `/addresses/${addressId}/emails/${id}/read`)
}
