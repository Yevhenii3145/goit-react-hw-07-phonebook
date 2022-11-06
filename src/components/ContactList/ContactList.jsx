import React from 'react'
import PropTypes from 'prop-types';
import { ContactsList } from './ContactList.styled'
import ContactItem from '../ContactItem/ContactItem'
// import { useEffect } from 'react';
// import { useDispatch } from 'react-redux';
// import { fetchContacts } from 'redux/contacts/contacts-operation';
// import { getFilteredContacts,} from 'redux/contacts/contacts-selectors';


export default function ContactList({items }) {
  // const contacts = useSelector(getFilteredContacts);
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(fetchContacts());
  // }, [dispatch]);

  return (
    <ContactsList>
      {items.map(item => (<ContactItem
        key={item.id}
        id={item.id}
        name={item.name}
        number={item.phone}
        // removeContact={removeContact}
        text={"Delete"}
      />))}
    </ContactsList>
  )
}

ContactList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape()),
}