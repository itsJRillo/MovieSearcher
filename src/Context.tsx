import React, { createContext, useContext, ReactNode } from 'react';

interface MyContextData {
}

const MyContext = createContext<MyContextData | undefined>(undefined);

interface MyProviderProps {
  children: ReactNode;
}

export const MyProvider: React.FC<MyProviderProps> = ({ children }) => {

  const contextValue: MyContextData = {
  };

  return (
    <MyContext.Provider value={contextValue}>
      {children}
    </MyContext.Provider>
  );
};

export const useMyContext = () => {
  const context = useContext(MyContext);
  if (!context) {
    throw new Error('useMyContext debe ser utilizado dentro de un MyProvider');
  }
  return context;
};
