import PropTypes from 'prop-types';

export const ImageGalleryItem = ({
  webformatURL,
  tags,
  onClick,
  largeImageURL,
}) => {
  return (
    <li className="ImageGalleryItem">
      <img
        className="ImageGalleryItem-image"
        src={webformatURL}
        alt={tags}
        onClick={onClick}
        name={largeImageURL}
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string,
  tags: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
