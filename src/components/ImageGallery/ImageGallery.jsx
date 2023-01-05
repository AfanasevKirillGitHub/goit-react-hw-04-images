import { Button } from "components/Button/Button";
import { ImageGalleryItem } from "components/ImageGalleryItem/ImageGalleryItem";
import Notiflix from "notiflix";
import { Component } from "react";
import { fetchImages } from "services/pixabayApi";

export class ImageGallery extends Component {

  state = {
    images: [],
    page: 1,
    error: null,
    status: "idle",
    showBtnLoadMore: false
  }


  componentDidUpdate(prevProps, prevState) {
    const prevSearchName = prevProps.searchName;
    const nextSearchName = this.props.searchName;

    if (prevSearchName !== nextSearchName) {
      this.setState({ status: "pending", page: 1 });
      const { page } = this.state

      fetchImages(nextSearchName, page)
        .then(images => {
          if (images.totalHits !== 0) {
            Notiflix.Notify.success(`Hooray! We found ${images.totalHits} images.`);
            this.setState({ showBtnLoadMore: true });
          }
          if (images.totalHits <= 12) {
            this.setState({ showBtnLoadMore: false });
          }
          this.setState({ images: images.hits, status: "resolved" })
        })
        .catch(error => this.setState({ error, status: "rejected" }))
    }
  }

  onNextPage = () => {

    this.setState(
      prevState => ({ page: (prevState.page += 1), }), () => {
        this.setState({ status: "pending" });
        const page = this.state.page;
        const nextSearchName = this.props.nextSearchName;
        // const { smoothScroll } = this.state;

        fetchImages(nextSearchName, page)
          .then(images => {
            if (page === Math.ceil(images.totalHits / 12)) {
              Notiflix.Notify.warning("We're sorry, but you've reached the end of search results.");
              this.setState({ showBtnLoadMore: false });
            }

            this.setState(prevState => ({
              images: [...prevState.images, ...images.hits],
              status: "resolved",
              // showLoader: false,
              // smoothScroll: true,
            }));
            // if (smoothScroll) { this.windowScroll(); }
          })
          .catch(error => this.setState({ error, status: "rejected" }));
      }
    );
  };

  render() {
    const { images, error, status, showBtnLoadMore } = this.state

    if (status === "idle") {
      return <h2>НАЧНИТЕ ВВОДИТЬ ВАШ ЗАПРОС</h2>
    }
    if (status === "pending") {
      return <h2>ИДЕТ ЗАГРУЗКА</h2>
    }
    if (status === "rejected") {
      return <h2>{error.message}</h2>
    }
    if (status === "resolved") {
      return (
        <div className="Wrapper">
          <ul className="ImageGallery">
            {images.map(({ id, webformatURL, tags }) => {
              return (
                <ImageGalleryItem
                  key={id}
                  webformatURL={webformatURL}
                  tags={tags} />
              )
            })}
          </ul>
          {showBtnLoadMore && < Button loadMore={this.onNextPage} />}
        </div>)
    }
  }
};
