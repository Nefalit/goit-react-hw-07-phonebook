import { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import ContactList from './ContactList/ContactList';

import {
  addContact,
  removeContact,
  fetchContacts,
} from '../redux/contacts/contacts-operation';
import { toFilter } from '../redux/filter/filter-slice';
import { getContacts } from '../redux/contacts/contacts-selector';
import { getFilter } from '../redux/filter/filter-selector';

const App = () => {
  const filter = useSelector(getFilter);
  const { items, loading, error } = useSelector(getContacts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  function addContactFunc(obj) {
    dispatch(addContact(obj));
  }

  const removeContactFunc = useCallback(
    id => {
      dispatch(removeContact(id));
    },
    [dispatch]
  );

  const handleFilter = ({ target }) => dispatch(toFilter(target.value));

  function getFilteredContact() {
    if (!filter) {
      return items;
    }
    const normalizeInput = filter.toLowerCase();
    const renderArr = items.filter(el =>
      el.name.toLowerCase().includes(normalizeInput)
    );
    return renderArr;
  }
  const filteredContact = getFilteredContact();

  return (
    <div>
      <h1 className="titleOne">Phonebook</h1>
      <ContactForm onSubmit={addContactFunc} />
      <Filter value={filter} onChange={handleFilter} />
      {loading && <p className='loading'>...Loading</p>}
      {error && <p className='error'>Error : {error.message}</p>}
      {error && <p className='error'>No access : {error.responseURL}</p>}

      <ContactList
        contacts={filteredContact}
        removeContact={removeContactFunc}
      />
    </div>
  );
};

export default App;
