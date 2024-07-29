import React, { forwardRef } from 'react';

function Input({ type, id, checked, placeholder, value, onChange, className, onBlur, onFocus, ...props }, ref) {
  return (
    <input
      type={type}
      id={id}
      placeholder={type !== 'checkbox' ? placeholder : undefined}
      checked={type === 'checkbox' ? checked : undefined}
      value={value || ''}
      onChange={onChange}
      onBlur={onBlur}
      onFocus={onFocus}
      className={`p-2 border rounded-md ${className}`}
      ref={ref}
      {...props}
      aria-invalid={!value && type !== 'checkbox'} // Ejemplo de accesibilidad
    />
  );
}

export default forwardRef(Input);
