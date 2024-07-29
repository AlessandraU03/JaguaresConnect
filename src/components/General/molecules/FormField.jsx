import React from 'react';
import Label from '../atoms/Label';
import Input from '../atoms/Input';

function FormField({ label, type, id, value, onChange, onBlur, placeholder, options = [], rows, readOnly, error }) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <Label htmlFor={id}>{label}</Label>
      
      {type === 'select' ? (
        <select
          id={id}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          className="block w-full p-2 border-gray-300 border rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          disabled={readOnly}
        >
          <option value="" disabled>{placeholder}</option>
          {options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select> 
      ) : type === 'textarea' ? (
        <textarea
          id={id}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          className="block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          placeholder={placeholder}
          rows={rows} 
        />
      ) : type === 'checkbox' ? (
        <input
          type="checkbox"
          id={id}
          checked={value}
          onChange={onChange}
          onBlur={onBlur}
          disabled={readOnly}
          className="block w-full form-checkbox h-8 text-blue-600 rounded-md"
        />
      ) : (
        <Input
          type={type}
          id={id}
          value={value}
          onChange={onChange}
          onBlur={onBlur} 
          placeholder={placeholder}
          readOnly={readOnly}
        />
      )}
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </div>
  );
}

export default FormField;
