import React from 'react';

function Icon ({ size, color }){
  return (
    <svg
      className={`w-${size} h-${size} text-${color}`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >

    </svg>
  );
};

export default Icon;