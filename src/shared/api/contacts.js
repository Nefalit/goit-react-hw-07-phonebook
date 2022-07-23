import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://62d965a89eedb699635b0683.mockapi.io/contacts/contacts',
});

export const getContacts = async () => {
  const { data } = await instance.get('/');
  return data;
};

export const addContact = async contact => {
  const { data: result } = await instance.post('/', contact);
  return result;
};

export const removeContact = async id => {
  const { data } = await instance.delete(`/${id}`);
  return data
};
