import { useState, ChangeEvent, FormEvent } from 'react';
import "../styles/main.css"
import lupaIcon from '../assets/lupa.png'

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
    <form className="search-container" onSubmit={handleFormSubmit}>
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
