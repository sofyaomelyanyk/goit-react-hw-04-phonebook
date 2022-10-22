import { Component } from "react";
import s from "./ContactForm.module.css"
import { ReactComponent as AddIcon } from "../icons/add.svg";


export class ContactForm extends Component {
   state = {
      name: '',
      number: '',
    }

    onChange = (e) => {

     this.setState({
      [e.target.name]: e.target.value,
       })
    }

    onSubmitFofm = (e) => {
      e.preventDefault()

      this.props.addContact(this.state)
      
      this.resetForm()
    }

    resetForm = () => {
      this.setState({name: '', number: ''})
   }

  render() {
   const {name, number} = this.state
   
    return (
      <form onSubmit={this.onSubmitFofm} className={s["form-wrap"]}>
         <label className={s["input-group"]}>
            <span>Name</span>
            <input
            className={s["input"]}
            onChange={this.onChange}
            type="text"
            name="name"
            value={name}
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            placeholder='Sam Colin'
            required
         />
         </label>
         <label className={s["input-group"]}>
            <span>Number</span>
            <input
            className={s["input"]}
               onChange={this.onChange}
               type="tel"
               name="number"
               value={number}
               pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
               title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
               placeholder='123-45-67'
               required
             />
         </label>
         <button type='submit' className={s["button"]}>
            <AddIcon width="60" height="60"/>
         </button>
      </form>
    )
  }
}
