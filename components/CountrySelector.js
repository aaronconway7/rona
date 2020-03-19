import { useContext } from 'react';
import Select from 'react-select';
import { useEffect } from 'react';
import { flag, code } from 'country-emoji';

import { CountryContext } from '../global-state/country';

const customStyles = {
    container: () => ({
        width: '350px',
        cursor: 'pointer',
    }),
    control: () => ({
        display: 'grid',
        gridTemplateColumns: '1fr auto',
        border: '1px solid rgba(255,255,255,0.2)',
    }),
    input: () => ({
        color: 'white',
        cursor: 'input',
    }),
    option: () => ({
        color: 'black',
        padding: '1em',
    }),
    menu: () => ({
        backgroundColor: 'rgba(255,255,255,0.1)',
    }),
    option: (_, state) => ({
        color: 'white',
        // opacity: 0.5,
        padding: '1em',
        backgroundColor: state.isFocused
            ? 'rgba(255,255,255,0.25)'
            : state.isSelected && '#d82239',
        cursor: 'pointer',
    }),
    singleValue: () => ({
        color: 'white',
    }),
};

const options = [{ value: null, label: `🌍 World` }];

const CountrySelector = ({ countries }) => {
    const { country, setCountry } = useContext(CountryContext);

    useEffect(() => {
        if (options.length === 1) {
            fetchData();
        }
    }, []);

    const fetchData = async () => {
        const sortedCountries = countries.sort((a, b) =>
            a.displayName.localeCompare(b.displayName)
        );
        sortedCountries.map(country => {
            options.push({
                value: country.displayName,
                label: `${flag(country.displayName) || ''} ${
                    country.displayName
                }`,
            });
        });
    };

    const handleChange = selectedOption => {
        setCountry(selectedOption.value);
    };

    return (
        <Select
            options={options}
            styles={customStyles}
            value={options.find(option => option.value === country)}
            onChange={selectedOption => handleChange(selectedOption)}
        />
    );
};

export default CountrySelector;
