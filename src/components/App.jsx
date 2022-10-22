import { Component } from "react";
import { nanoid } from 'nanoid';

import { Section } from "./Section/Section";
import { ContactForm } from "./ContactForm/ContactForm";
import { Filter } from "./Filter/Filter";
import { ContactsList } from "./ContactsList/ContactsList";

export class App extends Component {
   state = {
      contacts: [
         {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
         {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
         {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
         {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},
       ],
       filter: '',
   }

   componentDidMount(){
      const contacts = localStorage.getItem('contacts');
      const parsedContacts = JSON.parse(contacts)

      if(parsedContacts){
         this.setState({contacts: parsedContacts})
      }
   }

   componentDidUpdate(prevprops, prevState) {
      if(prevState.contacts !== this.state.contacts){
         localStorage.setItem('Contacts', JSON.stringify(this.state.contacts))
      }
   }


   addContact = (data) => {
      const newContact = {
         ...data,
        id: nanoid(),
      }

      if (this.state.contacts.some(({name}) => name === newContact.name)) {
         return alert(`${newContact.name} is already in contacts.`)
       }

      this.setState(({contacts}) => ({
         contacts: [newContact, ...contacts]
       }))

    }

    deleteContact = (id) => {
      this.setState(({contacts}) => 
        ({contacts: contacts.filter(contact => contact.id !== id)}),
      )
    }

    changeFilter = (e) => {
      this.setState({filter: e.target.value})
    }

   render() {
      const {contacts,filter} = this.state;
      const {deleteContact, addContact, changeFilter} = this

      const normalizeFilter = filter.toLowerCase()
      const filterContactsList = contacts.filter(({name}) => name.toLowerCase().includes(normalizeFilter))

      return(
         <>
         <Section title="Phonebook">
         <ContactForm
          addContact={addContact}/>
         </Section>
         <Section title="Contacts">
         <Filter filter={filter} changeFilter={changeFilter}/>
         <ContactsList contacts={filterContactsList} deleteContact={deleteContact}/>
         </Section>
      
         </>
      )
   }
}