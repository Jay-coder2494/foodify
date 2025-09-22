import React from 'react';

/**
 * Loading spinner component for better user experience
 */
const LoadingSpinner = ({ message = "Loading..." }) => {
  return (
    <div className="d-flex justify-content-center align-items-center p-4">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">{message}</span>
      </div>
      <span className="ms-2">{message}</span>
    </div>
  );
};

export default LoadingSpinner;