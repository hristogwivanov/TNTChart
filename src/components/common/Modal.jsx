// Modal.js
import React from 'react';
import ReactDOM from 'react-dom';
import './Modal.css'; // Ensure your modal styles are correctly imported

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null; // Do not render anything if the modal is not open

  return ReactDOM.createPortal(
    <>
      <div className="custom-modal-overlay" onClick={onClose} />
      <div className="custom-modal">
        <div className="custom-modal-header">
          <button className="custom-modal-close-button" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="custom-modal-content">{children}</div>
      </div>
    </>,
    document.getElementById('modal-root') // Render into the modal-root element
  );
};

export default Modal;
