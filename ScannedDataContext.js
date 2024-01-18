
import React, { createContext, useContext, useState } from 'react';

const ScannedDataContext = createContext();

export const ScannedDataProvider = ({ children }) => {
  const [scannedData, setScannedData] = useState([]);

  const addScannedData = (data) => {
    setScannedData((prevData) => [...prevData, data]);
  };

  return (
    <ScannedDataContext.Provider value={{ scannedData, addScannedData }}>
      {children}
    </ScannedDataContext.Provider>
  );
};

export const useScannedData = () => {
  const context = useContext(ScannedDataContext);
  if (!context) {
    throw new Error('useScannedData must be used within a ScannedDataProvider');
  }
  return context;
};
