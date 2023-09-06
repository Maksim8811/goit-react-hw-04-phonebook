import React, {useState} from "react";
import Phonebook from "./Phohebook/Phonebook";
import Contacts from "./Contacts/Contacts";
import Filter from "./Filter/Filter";
import { nanoid } from 'nanoid';
import { useEffect } from "react";


// class App extends Component {

//   state = {
//     contacts: [
//     {id: `${nanoid()}`, name: 'Rosie Simpson', number: '459-12-56'},
//     {id: `${nanoid()}`, name: 'Hermione Kline', number: '443-89-12'},
//     {id: `${nanoid()}`, name: 'Eden Clements', number: '645-17-79'},
//     {id: `${nanoid()}`, name: 'Annie Copeland', number: '227-91-26'},
//     ],
//     filter: '',
//     }

  

//   formSubmitHandler = ({name, number}) => {
    
//     const findName = this.state.contacts.find(contact => contact.name.includes(name))
//     if(findName){
//       alert(`${name} is already in contacts.`)
//     } else {
//       const contact = {
//         name,
//         id: `${nanoid()}`,
//         number,
//   }

//   this.setState(prevState => ({
//     contacts: [contact, ...prevState.contacts]
//   }))
//   }}

//   onFilter = evt => {
//     const filterInput = evt.target.value
//     this.setState({filter: filterInput})
//   }

//   onDelete = id => {
//     const contacts = this.state.contacts
//     const res = contacts.filter(contact => contact.id !== id)
//     this.setState({
//     contacts: res,
//       })
//   }

//   componentDidMount() {
//     const contacts = localStorage.getItem('contacts')
//     const parseContacts = JSON.parse(contacts)

//     if(parseContacts) {
//       this.setState({contacts: parseContacts})
//     }}

//   componentDidUpdate(prevState) {
    
//     if(this.state.contacts !== prevState.contacts) {
//        localStorage.setItem('contacts', JSON.stringify(this.state.contacts))
//     }
//   }


//   render () {
//    const normalize = this.state.filter.toLowerCase()
//    const filterName = this.state.contacts.filter(contact => contact.name.toLowerCase().includes(normalize))
  
//     return (
//       <>
//     <h1 className="title">Phonebook</h1>
//     <Phonebook onSubmit={this.formSubmitHandler}/>
//     <h2 className="title">Contacts</h2>
//     <Filter value={this.state.filter} onChange={this.onFilter}/>
//     <Contacts contacts={filterName} onDelete={this.onDelete}/>
//       </>
//     )
//   }
// }

 function App () {
   const [contacts, getContacts] = useState(
          [
          {id: `${nanoid()}`, name: 'Rosie Simpson', number: '459-12-56'},
          {id: `${nanoid()}`, name: 'Hermione Kline', number: '443-89-12'},
          {id: `${nanoid()}`, name: 'Eden Clements', number: '645-17-79'},
          {id: `${nanoid()}`, name: 'Annie Copeland', number: '227-91-26'},
          ]
   )
   const [filter, getFilter] = useState('')

   useEffect(()=>{
     localStorage.setItem('contacts', JSON.stringify(contacts))
    


   }, [contacts])

    const formSubmitHandler = ({name, number}) => {
      const findName = contacts.find(contact => contact.name.includes(name))
        if(findName){
          alert(`${name} is already in contacts.`)
        } else {
          const newContact = {
            name,
            id: `${nanoid()}`,
            number,
      }
    
      getContacts(prevContacts=>[newContact, ...prevContacts])
    }

    // getContacts(name)
        
    }

    const onFilter = evt => {
          const filterInput = evt.target.value
          getFilter(filterInput)
        }
      
    const getVisibleContacts = () => {
       const normalize = filter.toLowerCase()
        return contacts.filter(contact => contact.name.toLowerCase().includes(normalize))
        
    }
      
  const onDelete = id => {
    const res = contacts.filter(contact => contact.id !== id)
    getContacts(res)
  } 
    

   return (
    <>
         <h1 className="title">Phonebook</h1>
         <Phonebook onSubmit={formSubmitHandler}/>
         <h2 className="title">Contacts</h2>
         <Filter value={filter} onChange={onFilter}/>
         <Contacts contacts={getVisibleContacts()} onDelete={onDelete} />
          </>
   )
}

export default App
