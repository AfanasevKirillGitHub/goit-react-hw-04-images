import { useState } from 'react';
import { React } from 'react';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Searchbar } from './Searchbar/Searchbar';

export const App = () => {
  const [searchName, setSearchName] = useState('');

  const handleFormSubmit = searchName => {
    setSearchName(searchName);
  };

  return (
    <>
      <Searchbar onSubmit={handleFormSubmit} />
      <ImageGallery searchName={searchName} />
    </>
  );
};
