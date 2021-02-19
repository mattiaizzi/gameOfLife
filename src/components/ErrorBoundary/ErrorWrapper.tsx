import React, { useContext, useEffect } from 'react';
import { ModalContext } from '../../context/ModalContext/ModalContext';

interface ErrorWrapperProps {
  message?: string;
}

const ErrorWrapper: React.FC<ErrorWrapperProps> = ({ message }) => {
  const { open } = useContext(ModalContext);
  useEffect(() => {
    if (open) {
      open(<h1>{message}</h1>);
    }
  }, [message]);
  return null;
};

export default ErrorWrapper;
