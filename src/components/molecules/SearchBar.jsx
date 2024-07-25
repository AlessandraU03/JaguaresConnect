import React, { useState } from 'react';
import Input from '../atoms/Input';

function SearchBar({ placeholder, onSearch }) {
  const [value, setValue] = useState('');

  const handleInputChange = (event) => {
    const newValue = event.target.value;
    setValue(newValue);
    onSearch(newValue);
  };

  return (
    <Input
      type="text"
      placeholder={placeholder}
      className="p-2 border rounded"
      value={value}
      onChange={handleInputChange}
    />
  );
}

export default SearchBar;
