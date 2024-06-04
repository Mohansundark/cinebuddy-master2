// src/components/Modal.js

import React from "react";
import "../styles/Modal.css"; // Ensure you have the styles for the modal

// src/components/Modal.js


 // Make sure to import the CSS file

const Modal = ({ show, onClose, children, backdropPath }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div
        className="modal-content"
        style={{ backgroundImage: `url(${backdropPath})` }}
      >
        <button className="modal-close" onClick={onClose}>
          &times;
        </button>
        <div className="modal-children">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
