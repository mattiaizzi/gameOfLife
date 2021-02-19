import React from 'react';

export const useModal = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [content, setContent] = React.useState<React.ReactNode>();

  const close = () => {
    setIsOpen(false);
    setContent(null);
  };
  const open = (c: React.ReactNode) => {
    setIsOpen(true);
    setContent(c);
  };

  return { isOpen, open, close, content };
};
