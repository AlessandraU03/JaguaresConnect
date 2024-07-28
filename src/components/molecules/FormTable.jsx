import React from 'react';
import Label from '../Administrador/atoms/Label';
import Input from '../Administrador/atoms/Input';

function FormTable({ label, type, id, value, onChange, placeholder, options = [], rows, readOnly }) {
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
            placeholder={placeholder}
            readOnly={readOnly}
            className="block w-16 p-2 border-gray-300 border rounded-sm text-sm"
          min="1"
        max="10"
          />
      
      </div>
    
  );
}

export default FormTable;
