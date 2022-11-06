import React from 'react';
import { useMemo } from "react";
import { nanoid } from 'nanoid';
import { FormMarcup, FormLabel, FirstInput, SecondInput, FormButton } from './Form.styled';
import useForm from 'hooks/useForm';
import { addContact, isDublicate } from 'redux/contacts/contacts-operation';
import { useSelector, useDispatch } from 'react-redux';
import { getFilteredContacts} from 'redux/contacts/contacts-selectors';

const initialState = {
    name: '',
    phone: '',
}

export default function Form() {
    
    const inputNameId = useMemo(()=> nanoid(), []);
    const inputPhoneId = useMemo(()=> nanoid(), []);
    const contacts = useSelector(getFilteredContacts);
    const dispatch = useDispatch ();


    const addOneContact =  (data) => {
        const action = addContact(data);
        if(isDublicate(data,contacts)) {
          return alert(`${data.name} is already in contacts`);
        }
        dispatch(action);
    };

    const {state, handleChange, handleSubmit} = useForm({initialState, addOneContact});
    const {name, phone} = state;

    return (
        <FormMarcup onSubmit={handleSubmit}>
            <FormLabel htmlFor={inputNameId}>Name</FormLabel>
            <FirstInput
                id={inputNameId}
                type="text"
                name="name"
                value={name}
                onChange={handleChange}
                pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                required
            />

            <FormLabel htmlFor={inputPhoneId}>Phone</FormLabel>
            <SecondInput
                id={inputPhoneId}
                type="tel"
                name="phone"
                value={phone}
                onChange={handleChange}
                pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                required
            />
            <FormButton type='submit'>Add contact</FormButton>
        </FormMarcup>
    )
}
