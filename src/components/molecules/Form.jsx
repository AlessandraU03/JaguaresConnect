import React from 'react';
import Label from '../atoms/Label';
import Input from '../atoms/Input';

function Form({ label, type, id, value, onChange, placeholder, options = [], rows }) {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center mb-4">
      <Label htmlFor={id} className="w-32 text-right pr-4">{label}</Label>
      <div className="md:w-64">
        {type === 'select' ? (
          <select
            id={id}
            value={value}
            onChange={onChange}
            className="block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            <option value="">{placeholder}</option>
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
            className="block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder={placeholder}
            rows={rows} 
          />
        ) : (
          <Input type={type} id={id} value={value} onChange={onChange} placeholder={placeholder} className="w-full" />
        )}
      </div>
    </div>
  );
};

export default Form;
