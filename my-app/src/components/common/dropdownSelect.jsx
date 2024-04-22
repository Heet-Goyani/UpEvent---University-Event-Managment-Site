import React from 'react';
import Select from 'react-select';

const customStyles = {
    control: (provided) => ({
        ...provided,
        border: '1px solid #ccc',
        borderRadius: '5px',
        fontSize: '1rem',
        minHeight: 'unset',
    }),
    placeholder: (provided) => ({
        ...provided,
        color: '#999',
    }),
    menu: (provided) => ({
        ...provided,
        maxHeight: '200px',
    }),
};

const DropdownSelect = ({ colleges, placeholder, onChange }) => {
    const options = colleges.map((college) => ({
        value: college.college,
        label: college.college,
    }));

    return (
        <Select
            options={options}
            placeholder={placeholder}
            onChange={onChange}
            styles={customStyles}
            isSearchable
            maxMenuHeight={200}
        />
    );
};

export default DropdownSelect;
