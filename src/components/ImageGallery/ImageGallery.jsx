import PropTypes from 'prop-types';
import Notiflix from 'notiflix';
import { fetchImages } from 'services/pixabayApi';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Button } from 'components/Button/Button';
import { Loader } from 'components/Loader/Loader';
import { WaitRequest } from 'components/WaitRequest/WaitRequest';
import { Modal } from 'components/Modal/Modal';
import { NotFound } from 'components/NotFound/NotFound';
import { useState, useEffect } from 'react';

export const ImageGallery = ({ searchName }) => {
  const [imageName, setImageName] = useState('');
  const [images, setImages] = useState([]);
  const [largeImage, setLargeImage] = useState('');
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('idle');
  const [showBtnLoadMore, setShowBtnLoadMore] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (imageName !== searchName) {
      setImageName(searchName);
      setPage(1);
      setImages([]);
      setStatus('pending');
      setShowLoader(true);
      setShowBtnLoadMore(false);

      fetchImages(searchName, 1)
        .then(images => {
          if (images.totalHits !== 0) {
            Notiflix.Notify.success(
              `Hooray! We found ${images.totalHits} images.`
            );
            setImages(responseFilter(images));
            setStatus('resolved');
            setShowLoader(false);
            setShowBtnLoadMore(true);
          }

          if (images.totalHits <= 12) {
            setShowBtnLoadMore(false);
          }
        })
        .catch(error => {
          setError(error);
          setStatus('rejected');
        });
      return;
    }

    if (page !== 1) {
      setStatus('pending');
      setShowLoader(true);
      setShowBtnLoadMore(false);

      fetchImages(searchName, page)
        .then(images => {
          setImages(prev => [...prev, ...responseFilter(images)]);
          setStatus('resolved');
          setShowLoader(false);
          setShowBtnLoadMore(true);

          if (page === Math.ceil(images.totalHits / 12)) {
            setShowBtnLoadMore(false);
            Notiflix.Notify.info(
              "We're sorry, but you've reached the end of search results."
            );
          }
        })
        .catch(error => {
          setError(error);
          setStatus('rejected');
        });
      return;
    }
  }, [imageName, searchName, page]);

  const onClickLoadMore = () => {
    setPage(prev => prev + 1);
  };

  const onClickImage = event => {
    setLargeImage(event.target.name);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const responseFilter = images => {
    return images.hits.reduce((allParams, params) => {
      const response = {
        id: params.id,
        webformatURL: params.webformatURL,
        largeImageURL: params.largeImageURL,
        tags: params.tags,
      };
      allParams.push(response);
      return allParams;
    }, []);
  };

  if (status === 'idle') {
    return <WaitRequest />;
  }
  if (status === 'rejected') {
    return <NotFound error={error.message} />;
  }
  if (status === 'resolved' || 'pending') {
    return (
      <div className="Wrapper">
        <ul className="ImageGallery">
          {images.map(({ id, webformatURL, tags, largeImageURL }) => {
            return (
              <ImageGalleryItem
                key={id}
                webformatURL={webformatURL}
                tags={tags}
                largeImageURL={largeImageURL}
                onClick={onClickImage}
              />
            );
          })}
        </ul>
        {showModal && (
          <Modal closeModal={closeModal}>
            <img src={largeImage} alt="" />
          </Modal>
        )}
        {showLoader && <Loader />}
        {showBtnLoadMore && <Button loadMore={onClickLoadMore} />}
      </div>
    );
  }
};

ImageGallery.propTypes = {
  searchName: PropTypes.string.isRequired,
};
