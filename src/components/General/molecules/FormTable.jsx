import React from 'react';
import Label from '../atoms/Label';
import Input from '../atoms/Input';

function FormTable({ label, type, id, value, onChange, placeholder, options = [], rows, readOnly, error, onBlur }) {
  return (
    <div className="flex items-center gap-[10px] p-2 px-[50px] border border-gray-300 rounded-sm">
      <Label
        htmlFor={id}
        className="w-1/3 text-sm font-medium text-gray-700 border-r border-gray-300 pr-2"
      >
        {label}
      </Label>
      
          <Input
            type={type}
            id={id}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            placeholder={placeholder}
            readOnly={readOnly}
            className="block w-16 p-2 border-gray-300 border rounded-sm text-sm"
          min="1"
        max="10"
          />
            {error && <div style={{ color: 'red' }}>{error}</div>}
      </div>
      
    
  );
}

export default FormTable;
