import Input from '../atoms/Input';
import Button from '../atoms/Button';
import { useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';

function SearchBarDate({ onSearch, placeholder }) {
    const [searchValue, setSearchValue] = useState('');
    const [dateValue, setDateValue] = useState('');

    const handleChange = (e) => {
        const value = e.target.value;
        setSearchValue(value);
        onSearch({ query: value, fecha:dateValue });
    };

    const handleDateChange = (e) => {
        const value = e.target.value;
        const formattedDate = value.split('-').reverse().join('/');
        setSearchValue(formattedDate);
        onSearch({ query: searchValue, fecha: formattedDate });
    };

    return (
        <div className="relative flex items-center">
            <Input
                type="text"
                value={searchValue}
                onChange={handleChange}
                placeholder={placeholder}
                className="border p-2"
            />
            <Input
                type="date"
                value={dateValue}
                onChange={handleDateChange}
                className="absolute top-0 right-0 opacity-0 w-8 h-8" // Ajusta el tamaño aquí
                onFocus={(e) => e.target.showPicker()}
            />
            <Button
                onClick={() => document.querySelector('input[type="date"]').showPicker()}
                className="absolute right-2"
            >
                <FontAwesomeIcon icon={faCalendar} />
            </Button>
        </div>
    );
}

export default SearchBarDate;
