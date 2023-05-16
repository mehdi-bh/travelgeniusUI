import { useState } from 'react';
import Select from 'react-select';
import { BiWalk, BiCar } from 'react-icons/bi';

const options = [
    { value: 'walk', label: <BiWalk /> },
    { value: 'car', label: <BiCar /> },
];

const TransportSelector = () => {
    const [selectedOption, setSelectedOption] = useState(options[0]);

    return (
        <Select
            className="transport-select"
            value={selectedOption}
            onChange={setSelectedOption}
            options={options}
            isSearchable={false}
            components={{
                SingleValue: () => <div>{selectedOption.label}</div>,
            }}
            styles={{
                control: (styles) => ({
                    ...styles,
                    backgroundColor: 'transparent',
                    border: 'none',
                    boxShadow: 'none',
                    width: '100px',
                }),
                indicatorSeparator: (styles) => ({ ...styles, backgroundColor: 'transparent' }),
            }}
        />
    );
};

export default TransportSelector;
