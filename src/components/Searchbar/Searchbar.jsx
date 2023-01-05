import Notiflix from 'notiflix';
import { React, Component } from 'react';
import { BsSearch } from 'react-icons/bs';
import PropTypes from 'prop-types';

export class Searchbar extends Component {
  state = {
    searchName: '',
  };

  handleOnChange = event => {
    this.setState({ searchName: event.currentTarget.value.toLowerCase() });
  };

  handleOnSubmit = event => {
    event.preventDefault();

    if (this.state.searchName.trim() === '') {
      Notiflix.Notify.warning('Please enter your request');
      return;
    }

    const { onSubmit } = this.props;
    const { searchName } = this.state;
    onSubmit(searchName);

    this.setState({ searchName: '' });
  };

  render() {
    const { searchName } = this.state;

    return (
      <header className="Searchbar">
        <form className="SearchForm" onSubmit={this.handleOnSubmit}>
          <button type="submit" className="SearchForm-button">
            <BsSearch size="24" />
          </button>

          <input
            onChange={this.handleOnChange}
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
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
