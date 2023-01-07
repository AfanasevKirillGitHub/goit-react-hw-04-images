import { Component } from 'react';
import PropTypes from 'prop-types';
import { SlClose } from 'react-icons/sl';

export class Modal extends Component {
  static propTypes = {
    closeModal: PropTypes.func.isRequired,
  };

  componentDidMount() {
    window.addEventListener('keydown', this.closeOnClickEsc);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.closeOnClickEsc);
  }

  closeOnClickBackDrop = event => {
    if (event.target === event.currentTarget) {
      this.props.closeModal();
    }
  };
  closeOnClickEsc = event => {
    if (event.code === 'Escape') {
      this.props.closeModal();
    }
  };

  render() {
    const { children, closeModal } = this.props;
    return (
      <div className="Overlay" onClick={this.closeOnClickBackDrop}>
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
  }
}
