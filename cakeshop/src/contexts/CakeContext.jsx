import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";

const CakeContext = createContext();

export const CakeProvider = ({ children }) => {
  const [cakes, setCakes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  //   const [error, setError] = useState(null);

  // Initialize cakes state on app load
  useEffect(() => {
    const fetchCakes = async () => {
      //map all cake
    };
    fetchCakes();
  }, []);

  return (
    <CakeContext.Provider
      value={{
        cakes,
        setCakes,
        isLoading,
      }}
    >
      {children}
    </CakeContext.Provider>
  );
};

CakeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default CakeContext;
