import Notiflix from 'notiflix';
import { React, Component } from 'react';
import { BsSearch } from 'react-icons/bs';
import PropTypes from 'prop-types';

export class Searchbar extends Component {
  state = {
    searchValue: '',
  };

  handleOnChange = event => {
    this.setState({ searchValue: event.currentTarget.value.toLowerCase() });
  };

  handleOnSubmit = event => {
    event.preventDefault();

    if (this.state.searchValue.trim() === '') {
      Notiflix.Notify.warning('Please enter your request');
      return;
    }

    const { onSubmit } = this.props;
    const { searchValue } = this.state;

    onSubmit(searchValue);
    this.setState({ searchValue: '' });
  };

  render() {
    const { searchValue } = this.state;

    return (
      <header className="Searchbar">
        <form className="SearchForm" onSubmit={this.handleOnSubmit}>
          <button type="submit" className="SearchForm-button">
            <BsSearch size="24" />
          </button>

          <input
            onChange={this.handleOnChange}
            value={searchValue}
            className="SearchForm-input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
