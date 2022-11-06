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
import {getState, getFilteredContacts,} from 'redux/contacts/contacts-selectors';
// import { removeContact} from 'redux/contacts/contacts-operation';
import { fetchContacts } from 'redux/contacts/contacts-operation';

export default function App() {
  const contacts = useSelector(getFilteredContacts);
  const { loading, error } = useSelector(getState);
  const filter = useSelector(getFilter);
  const filterId = nanoid();
  const dispatch = useDispatch();

  
  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

//   const addOneContact = data => {
//     const action = addContact(data);
//     if(isDublicate(data,contacts)) {
//       return alert(`${data.name} is already in contacts`);
//     }
//     dispatch(action);
// };

  
  return (
    <Container>
      <TitlePage text={'Phonebook'}></TitlePage>
      <Form />
      {/* <Form onSubmit={addOneContact} /> */}
      <Heading text={'Contacts'}></Heading>
      <Filter filterId={filterId} filter={filter} />
      {!loading && contacts.length > 0 && (
        
        // <ContactList items={contacts} removeContact={onRremoveContact} />
        <ContactList items={contacts} />
      )}
      {loading && <p>...loading</p>}
      {error && <p>oops, something went wrong</p>}
    </Container>
  );
}
