import React from 'react';
import Form from 'react-bootstrap/Form';
import './searchbar.scss';

function SearchBar({ onSearch }) {
    const handleInputChange = (e) => {
        onSearch(e);
    };

    return (
        <Form.Control
            type="text"
            placeholder="Search by name"
            className="search-bar"
            onChange={(e) => handleInputChange(e.target.value)}
        />
    );
} export default SearchBar;