import { React, Component } from 'react';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Searchbar } from './Searchbar/Searchbar';



export class App extends Component {
  state = {
    searchName: '',
  };

  handleFormSubmit = searchName => {
    this.setState({ searchName });
  };

  render() {
    const { searchName } = this.state;

    return (
      <>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery searchName={searchName} />
      </>
    );
  }
}
