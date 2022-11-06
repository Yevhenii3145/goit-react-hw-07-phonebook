import * as api from '../../gettingData/getContacts';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const isDublicate = ({ name }, contacts) => {
const normalizedName = name.toLowerCase();
  const result = contacts.find(contact => contact.name.toLowerCase() === normalizedName);
  return result;
};

export const fetchContacts = createAsyncThunk(
  'contacts/fetchAll',
  async (_, thunkApi) => {
    try {
      const data = await api.getContacts();
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const addContact = createAsyncThunk(
  'contacts/addContact',
  async (data, { rejectWithValue, getState }) => {
    // const { contacts } = getState();
    // if (isDublicate(data, contacts.items)) {
    //     return alert(`${data.name} is already in contacts`);
    //   }
    try {
      const result = await api.addContact(data);
      return result;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
  {
    condition: (data, { getState }) => {
      const { contacts } = getState();
      if (isDublicate(data, contacts.items)) {
        return alert(`${data.name} is already in contacts`);
      }
    },
  }
);

export const removeContact = createAsyncThunk(
  'contacts/deleteContact',
  async (id, { rejectWithValue }) => {
    try {
      await api.removeContact(id);
      return id;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
