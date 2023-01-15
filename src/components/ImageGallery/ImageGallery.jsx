import PropTypes from 'prop-types';
import Notiflix from 'notiflix';
// import { Component } from 'react';
import { fetchImages } from 'services/pixabayApi';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Button } from 'components/Button/Button';
import { Loader } from 'components/Loader/Loader';
import { WaitRequest } from 'components/WaitRequest/WaitRequest';
import { Modal } from 'components/Modal/Modal';
import { NotFound } from 'components/NotFound/NotFound';
import { useState, useEffect } from 'react';

// export class ImageGallery1 extends Component {
//   state = {
//     images: [],
//     largeImage: '',
//     page: 1,
//     error: null,
//     status: 'idle',
//     showBtnLoadMore: false,
//     showLoader: false,
//     showModal: false,
//   };

//   componentDidUpdate(prevProps, prevState) {
//     const prevSearchName = prevProps.searchName;
//     const nextSearchName = this.props.searchName;

//     if (prevSearchName !== nextSearchName) {
//       this.setState(
//         {
//           images: [],
//           status: 'pending',
//           showLoader: true,
//           showBtnLoadMore: false,
//           page: 1,
//         },
//         async () => {
//           const page = this.state.page;
//           try {
//             const images = await fetchImages(nextSearchName, page);

//             if (images.totalHits !== 0) {
//               Notiflix.Notify.success(
//                 `Hooray! We found ${images.totalHits} images.`
//               );
//               this.setState({
//                 images: [...this.responseFilter(images)],
//                 status: 'resolved',
//                 showLoader: false,
//                 showBtnLoadMore: true,
//               });
//             }

//             if (images.totalHits <= 12) {
//               this.setState({ showBtnLoadMore: false });
//             }
//           } catch (error) {
//             this.setState({ error, status: 'rejected' });
//           }
//         }
//       );
//     }

//     if (this.state.page > prevState.page) {
//       this.setState(
//         {
//           status: 'pending',
//           showLoader: true,
//           showBtnLoadMore: false,
//         },
//         async () => {
//           const page = this.state.page;
//           try {
//             const images = await fetchImages(nextSearchName, page);
//             this.setState(prevState => ({
//               images: [...prevState.images, ...this.responseFilter(images)],
//               status: 'resolved',
//               showLoader: false,
//               showBtnLoadMore: true,
//             }));

//             if (page === Math.ceil(images.totalHits / 12)) {
//               Notiflix.Notify.info(
//                 "We're sorry, but you've reached the end of search results."
//               );
//               this.setState({ showBtnLoadMore: false });
//             }
//           } catch (error) {
//             this.setState({ error, status: 'rejected' });
//           }
//         }
//       );
//     }
//   }

//   onClickLoadMore = () => {
//     this.setState(prevState => ({
//       page: prevState.page + 1,
//     }));
//   };

//   onClickImage = event => {
//     this.setState({
//       largeImage: event.target.name,
//       showModal: true,
//     });
//   };

//   closeModal = () => {
//     this.setState({
//       showModal: false,
//     });
//   };

//   responseFilter = images => {
//     return images.hits.reduce((allParams, params) => {
//       const response = {
//         id: params.id,
//         webformatURL: params.webformatURL,
//         largeImageURL: params.largeImageURL,
//         tags: params.tags,
//       };
//       allParams.push(response);
//       return allParams;
//     }, []);
//   };

//   render() {
//     const {
//       images,
//       error,
//       status,
//       showBtnLoadMore,
//       showLoader,
//       showModal,
//       largeImage,
//     } = this.state;
//     if (status === 'idle') {
//       return <WaitRequest />;
//     }
//     if (status === 'rejected') {
//       return <NotFound error={error.message} />;
//     }
//     if (status === 'resolved' || 'pending') {
//       return (
//         <div className="Wrapper">
//           <ul className="ImageGallery">
//             {images.map(({ id, webformatURL, tags, largeImageURL }) => {
//               return (
//                 <ImageGalleryItem
//                   key={id}
//                   webformatURL={webformatURL}
//                   tags={tags}
//                   largeImageURL={largeImageURL}
//                   onClick={this.onClickImage}
//                 />
//               );
//             })}
//           </ul>
//           {showModal && (
//             <Modal closeModal={this.closeModal}>
//               <img src={largeImage} alt="" />
//             </Modal>
//           )}
//           {showLoader && <Loader />}
//           {showBtnLoadMore && <Button loadMore={this.onClickLoadMore} />}
//         </div>
//       );
//     }
//   }
// }

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
      setPage(1);
      setImages([]);
      setImageName(searchName);
      setStatus('pending');
      setShowLoader(true);
      setShowBtnLoadMore(false);

      const asyncFunction = async () => {
        try {
          const images = await fetchImages(searchName, page);

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
        } catch (error) {
          setError(error);
          setStatus('rejected');
        }
      };
      asyncFunction();
    }

    if (page !== 1) {
      setStatus('pending');
      setShowLoader(true);
      setShowBtnLoadMore(false);

      const asyncFunctionPage = async () => {
        try {
          const images = await fetchImages(searchName, page);
          setImages(prev => [...prev, ...responseFilter(images)]);
          setStatus('resolved');
          setShowLoader(false);
          setShowBtnLoadMore(true);
          if (page === Math.ceil(images.totalHits / 12)) {
            Notiflix.Notify.info(
              "We're sorry, but you've reached the end of search results."
            );
            setShowBtnLoadMore(true);
          }
        } catch (error) {
          setError(error);
          setStatus('rejected');
        }
      };
      asyncFunctionPage();
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
