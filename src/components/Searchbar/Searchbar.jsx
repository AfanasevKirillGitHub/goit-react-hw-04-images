import Notiflix from 'notiflix';
import { React } from 'react';
import { BsSearch } from 'react-icons/bs';
import PropTypes from 'prop-types';
import { useState } from 'react';

export const Searchbar = ({ onSubmit }) => {
  const [searchName, setSearchName] = useState('');

  const handleOnChange = event => {
    setSearchName(event.currentTarget.value.toLowerCase());
  };

  const handleOnSubmit = event => {
    event.preventDefault();

    if (searchName.trim() === '') {
      Notiflix.Notify.warning('Please enter your request');
      return;
    }

    onSubmit(searchName);
    setSearchName('');
  };

  return (
    <header className="Searchbar">
      <form className="SearchForm" onSubmit={handleOnSubmit}>
        <button type="submit" className="SearchForm-button">
          <BsSearch size="24" />
        </button>

        <input
          onChange={handleOnChange}
          value={searchName}
          className="SearchForm-input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
