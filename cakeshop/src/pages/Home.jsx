import React from 'react';
import Swiper from '../components/Swiper'; 

const Home = () => {
  return (
    <div className="sm:px-4 sm:py-3 px-2 py-1 max-w-7xl mx-auto">
      {/* Swiper Component */}
      <Swiper /> 
      {/* Home Page Header */}
      <h1 className="text-4xl text-center mt-20">Home Page</h1>
    </div>
  );
};

export default Home;