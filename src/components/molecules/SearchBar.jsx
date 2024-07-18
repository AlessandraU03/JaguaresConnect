import Input from '../atoms/Input';

function SearchBar({ placeholder, onSearch }) {
  const handleInputChange = (event) => {
    onSearch(event.target.value);
  };

  return (
    <Input
      type="text"
      placeholder={placeholder}
      className="p-2 border rounded"
      onChange={handleInputChange}
    />
  );
}

export default SearchBar;
