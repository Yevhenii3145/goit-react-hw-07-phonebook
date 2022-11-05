import React from 'react';
import { useEffect } from 'react';
import { nanoid } from 'nanoid';
import Form from './components/Form/Form';
import ContactList from './components/ContactList/ContactList';
import Filter from './components/Filter/Filter';
import { Container } from './components/Container/Container.styled';
import { TitlePage } from './components/Title/Title';
import { Heading } from './components/Heading/Heading';
import { useSelector, useDispatch } from 'react-redux';
import { getFilter } from 'redux/filter/filter-selectors';
import {
  getFilteredContacts,
  getState,
} from 'redux/contacts/contacts-selectors';
import { fetchContacts, removeContact,addContact } from 'redux/contacts/contacts-operation';

export default function App() {
  const contacts = useSelector(getFilteredContacts);
  const { loading, error } = useSelector(getState);
  const filter = useSelector(getFilter);
  const filterId = nanoid();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const addOneContact = data => {
    const action = addContact(data);
    dispatch(action);
};

  const onRremoveContact = id => {
    const action = removeContact(id);
    dispatch(action);
  };

  return (
    <Container>
      <TitlePage text={'Phonebook'}></TitlePage>
      <Form onSubmit={addOneContact} />
      <Heading text={'Contacts'}></Heading>
      <Filter filterId={filterId} filter={filter} />
      {!loading && contacts.length > 0 && (
        <ContactList items={contacts} removeContact={onRremoveContact} />
      )}
      {loading && <p>...loading</p>}
      {error && <p>oops, something went wrong</p>}
    </Container>
  );
}
