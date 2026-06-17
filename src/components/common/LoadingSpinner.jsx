import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] w-full">
      <div className="relative w-16 h-16">
        {/* Outer glowing ring */}
        <div className="absolute inset-0 rounded-full border-4 border-primary/20 animate-pulse"></div>
        {/* Inner rotating gradient spinner */}
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-primary border-r-primary animate-spin"></div>
      </div>
      <p className="mt-4 text-sm font-medium text-text-gray animate-pulse">
        Loading CRM data...
      </p>
    </div>
  );
};

export default LoadingSpinner;
