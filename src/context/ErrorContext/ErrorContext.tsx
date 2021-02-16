import React, { createContext, useState } from 'react';

type ContextProps = {
  error: Error | null;
  setError: (error: Error) => void;
  clear: () => void;
};

export const ErrorContext = createContext<Partial<ContextProps>>({});

export const ErrorProvider: React.FC = ({ children }) => {
  const [error, setError] = useState<Error | null>(null);

  const clear = () => {
    setError(null);
  };

  return <ErrorContext.Provider value={{ error, setError, clear }}>{children}</ErrorContext.Provider>;
};
