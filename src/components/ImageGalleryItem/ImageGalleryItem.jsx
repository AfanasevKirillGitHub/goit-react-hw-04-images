import PropTypes from "prop-types";

export const ImageGalleryItem = ({ webformatURL, tags }) => {
  return (
    <li className="ImageGalleryItem" >
      <img className="ImageGalleryItem-image" src={webformatURL} alt={tags} />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired
}