import axios from 'axios';
import Notiflix from 'notiflix';

export const fetchImages = async (query, page) => {
  const API_URL = 'https://pixabay.com/api/';
  const options = {
    params: {
      key: '31327545-22153141499549b09c377ad67',
      image_type: 'photo',
      orientation: 'horizontal',
      q: `${query}`,
      safesearch: true,
      page: `${page}`,
      per_page: 12,
    },
  };

  const response = await axios.get(API_URL, options);
  if (response.data.total === 0) {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    throw new Error('Nothing found for your request');
  }
  return response.data;
};
