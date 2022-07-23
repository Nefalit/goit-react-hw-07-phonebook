import { createAsyncThunk } from '@reduxjs/toolkit';

import * as api from '../../shared/api/contacts';

export const fetchContacts = createAsyncThunk(
  'contacts/fetch',
  async (_, { rejectWithValue }) => {
    try {
      const result = await api.getContacts();
      return result;
    } catch (error) {
        const { data, status } = error.response;
        const {message} = error;
        const {responseURL}= error.response.request;
        return rejectWithValue({ data, status, message,responseURL });
    }
  }
);

export const addContact = createAsyncThunk(
  'contact/add',
  async (data, { rejectWithValue }) => {
    try {
      const result = await api.addContact(data);
      return result;
    } catch (error) {
        const { data, status } = error.response;
        const {message} = error;
        const {responseURL}= error.response.request;
        return rejectWithValue({ data, status, message,responseURL });
    }
  },
  {
    condition: (data, { getState }) => {
      const { contacts } = getState();
      const { name, phone } = data;
      const isDublicate = contacts.items.find(
        item => item.name === name && item.phone === phone
      );
      if (isDublicate) {
        alert(
          `Contact with name: ${name} and phone: ${phone} - is already exist`
        );
        return false;
      }
    },
  }
);

export const removeContact = createAsyncThunk(
  'contact/remove',
  async (id, { rejectWithValue }) => {
    try {
      const result = await api.removeContact(id);
      return result;
    } catch (error) {
        const { data, status } = error.response;
        const {message} = error;
        const {responseURL}= error.response.request;
        return rejectWithValue({ data, status, message,responseURL });
    }
  }
);
