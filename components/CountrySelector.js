import { useContext } from 'react';
import Select from 'react-select';
import { useEffect } from 'react';
import { flag } from 'country-emoji';
import useSwr from 'swr';

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
const fetcher = url => fetch(url).then(res => res.json());

const CountrySelector = () => {
    const { country, setCountry } = useContext(CountryContext);
    const { data: countries, error } = useSwr(
        'https://corona-api.com/countries?include=timeline',
        fetcher
    );

    if (error) return <p>error</p>;
    if (!countries) return <p>loading</p>;

    useEffect(() => {
        if (options.length === 1) {
            generateOptions();
        }
    }, []);

    const generateOptions = () => {
        countries.data.map(country => {
            options.push({
                value: country.code.toLowerCase(),
                label: `${flag(country.code) || ''} ${country.name}`,
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
