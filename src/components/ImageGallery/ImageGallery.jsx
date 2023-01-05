import { ImageGalleryItem } from "components/ImageGalleryItem/ImageGalleryItem";
import Notiflix from "notiflix";
import { Component } from "react";
import { fetchImages } from "services/pixabayApi";

export class ImageGallery extends Component {

  state = {
    images: [],
    page: 1,
    error: null,
    status: "idle"
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
            // this.setState({ showBtnLoadMore: true });
          }
          if (images.totalHits <= 12) {
            // this.setState({ showBtnLoadMore: false });
          }
          this.setState({ images: images.hits, status: "resolved" })
        })
        .catch(error => this.setState({ error, status: "rejected" }))
    }
  }


  render() {
    const { images, error, status } = this.state

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
        <ul className="ImageGallery">
          {images.map(({ id, webformatURL, tags }) => {
            return (
              <ImageGalleryItem
                key={id}
                webformatURL={webformatURL}
                tags={tags} />
            )
          })}
        </ul>)
    }
  }
};
