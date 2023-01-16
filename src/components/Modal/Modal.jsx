import PropTypes from 'prop-types';
import { SlClose } from 'react-icons/sl';
import { useEffect } from 'react';

export const Modal = ({ closeModal, children }) => {
  useEffect(() => {
    window.addEventListener('keydown', closeOnClickEsc);
    return () => {
      window.removeEventListener('keydown', closeOnClickEsc);
    };
  });

  const closeOnClickBackDrop = event => {
    if (event.target === event.currentTarget) {
      closeModal();
    }
  };

  const closeOnClickEsc = event => {
    if (event.code === 'Escape') {
      closeModal();
    }
  };

  return (
    <div className="Overlay" onClick={closeOnClickBackDrop}>
      <div className="Modal">
        {children}
        <button
          className="Close-Modal"
          type="button"
          aria-label="close"
          onClick={closeModal}
        >
          <SlClose size={32} color="#303f9f" />
        </button>
      </div>
    </div>
  );
};

Modal.propTypes = {
  closeModal: PropTypes.func,
  children: PropTypes.node,
};
