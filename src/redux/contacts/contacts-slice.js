import { createSlice } from '@reduxjs/toolkit';
import { fetchContacts, addContact, removeContact } from './contacts-operation';

const initialState = {
  items: [],
  loading: false,
  error: null,
};
const pending = store => ({
  ...store,
  loading: true,
  error: null,
});
const rejected = (store, { payload }) => ({
  ...store,
  loading: false,
  error: payload,
});

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  extraReducers: {
    // fetchContacts
    [fetchContacts.pending]: pending,
    [fetchContacts.fulfilled]: (store, { payload }) => {
      store.items = payload;
      store.loading = false;
    },
    [fetchContacts.rejected]: rejected,

    // addContact
    [addContact.pending]: pending,
    [addContact.fulfilled]: (store, { payload }) => {
      store.items.push(payload);
      store.loading = false;
    },
    [addContact.rejected]: rejected,

    //removeContact
    [removeContact.pending]: pending,
    [removeContact.fulfilled]: (store, { payload }) => {
      store.items = store.items.filter(item => item.id !== payload.id);
      store.loading = false;
    },
    [removeContact.rejected]: rejected,
  },
});

export default contactsSlice.reducer;
