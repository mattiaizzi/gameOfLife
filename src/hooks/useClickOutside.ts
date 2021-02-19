import { useEffect, RefObject } from 'react';

export const useClickOutside = (ref: RefObject<Element> | null, callback: (event: MouseEvent) => void): void => {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref && ref.current && !ref.current.contains(event.target as Node)) {
        callback(event);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, callback]);
};
