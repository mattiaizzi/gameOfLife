import React, { useContext, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { ModalContext } from '../../context/ModalContext/ModalContext';
import { useClickOutside } from '../../hooks/useClickOutside';
import './style.css';

const modalRoot = document.getElementById('modal-root');

const Modal = () => {
  const { isOpen, close, content } = useContext(ModalContext);
  const modal = useRef(null);

  useClickOutside(modal, () => {
    if (close) {
      close();
    }
  });

  if (!modalRoot || !isOpen) {
    return null;
  }
  return createPortal(
    <div className="modal-background" style={{ background: 'rgba(0,0,0,0.8)' }}>
      <div ref={modal} className="modal-content">
        <button className="close-button" onClick={close}>
          &times;
        </button>
        {content}
      </div>
    </div>,
    modalRoot,
  );
};

export default Modal;
