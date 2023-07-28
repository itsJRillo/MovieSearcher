import { useState, ChangeEvent, FormEvent } from 'react';
import styles from "../styles/main.module.css"
import lupaIcon from '../assets/searchIcon.png'

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSearchTerm('');
  };

  return (
    <form className={styles.searchContainer} onSubmit={handleFormSubmit}>
      <input
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={handleInputChange}
      />
      <button type="submit">
        <img src={lupaIcon}/>
      </button>
    </form>
  );
};

export default SearchBar;
