import PropTypes from 'prop-types';
import Notiflix from 'notiflix';
import { Component } from 'react';
import { fetchImages } from 'services/pixabayApi';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Button } from 'components/Button/Button';
import { Loader } from 'components/Loader/Loader';
import { WaitRequest } from 'components/WaitRequest/WaitRequest';
import { Modal } from 'components/Modal/Modal';
import { NotFound } from 'components/NotFound/NotFound';

export class ImageGallery extends Component {
  state = {
    images: [],
    page: 1,
    error: null,
    status: 'idle',
    showBtnLoadMore: false,
    showLoader: false,
    largeImage: '',
    showModal: false,
  };

  componentDidUpdate = prevProps => {
    const prevSearchName = prevProps.searchName;
    const nextSearchName = this.props.searchName;

    if (prevSearchName !== nextSearchName) {
      this.setState({ status: 'pending', page: 1, showLoader: true }, () => {
        const page = this.state.page;

        fetchImages(nextSearchName, page)
          .then(images => {
            if (images.totalHits !== 0) {
              Notiflix.Notify.success(
                `Hooray! We found ${images.totalHits} images.`
              );
              this.setState({ showBtnLoadMore: true });
            }
            if (images.totalHits <= 12) {
              this.setState({ showBtnLoadMore: false });
            }

            this.setState({
              images: [...images.hits],
              status: 'resolved',
              showLoader: false,
            });
          })
          .catch(error => this.setState({ error, status: 'rejected' }));
      });
    }
  };

  onClickLoadMore = () => {
    this.setState(
      prevState => ({ page: (prevState.page += 1) }),
      () => {
        this.setState({ status: 'pending', showLoader: true });
        const page = this.state.page;
        const nextSearchName = this.props.searchName;
        // const { smoothScroll } = this.state;

        fetchImages(nextSearchName, page)
          .then(images => {
            if (page === Math.ceil(images.totalHits / 12)) {
              Notiflix.Notify.info(
                "We're sorry, but you've reached the end of search results."
              );
              this.setState({ showBtnLoadMore: false });
            }

            this.setState(prevState => ({
              images: [...prevState.images, ...images.hits],
              status: 'resolved',
              showLoader: false,
              // smoothScroll: true,
            }));
            // if (smoothScroll) {
            //   this.windowScroll();
            // }
          })
          .catch(error => this.setState({ error, status: 'rejected' }));
      }
    );
  };

  onClickImage = (event) => {
    this.setState({
      largeImage: event.target.name,
      showModal: true
    })
  }

  closeModal = () => {
    this.setState({
      showModal: false,
    });
  };

  render() {
    const { images, error, status, showBtnLoadMore, showLoader, showModal, largeImage } = this.state;
    console.log(images);
    if (status === 'idle') {
      return <WaitRequest />;
    }
    if (status === 'rejected') {
      return <NotFound error={error.message} />;
    }
    if (status === 'resolved' || status === 'pending') {
      return (
        <div className="Wrapper">
          <ul className="ImageGallery"  >
            {images.map(({ id, webformatURL, tags, largeImageURL }) => {
              return (
                <ImageGalleryItem
                  key={id}
                  webformatURL={webformatURL}
                  tags={tags}
                  largeImageURL={largeImageURL}
                  onClick={this.onClickImage}
                />
              );
            })}
          </ul>
          {showModal && <Modal closeModal={this.closeModal}><img src={largeImage} alt="" /></Modal>}
          {showLoader && <Loader />}
          {showBtnLoadMore && <Button loadMore={this.onClickLoadMore} />}
        </div>
      );
    }
  }
}

ImageGallery.propTypes = {
  searchName: PropTypes.string.isRequired,
};
