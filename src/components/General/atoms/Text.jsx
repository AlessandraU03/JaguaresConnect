import React from 'react';

function Text({ children, className }) {
  return (
    <p className={className}>
      {children}
    </p>
  );
}

export default Text;
