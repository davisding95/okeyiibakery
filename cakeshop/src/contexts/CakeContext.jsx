import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { getAllCakes } from "../services/apiCake";

const CakeContext = createContext();

export const CakeProvider = ({ children }) => {
  const [cakes, setCakes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Initialize cakes state on app load
  useEffect(() => {
    const fetchCakes = async () => {
      try {
        const res = await getAllCakes();
        if (res.success) {
          setCakes(res.data);
          setIsLoading(false);
        } else {
          //   setError(res.message);
          setIsLoading(false);
        }
      } catch (error) {
        // setError(error.message);
        console.error("Error:", error.message);
        setIsLoading(false);
      }
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
