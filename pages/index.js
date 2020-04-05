import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import fetch from 'isomorphic-unfetch';
import { flag } from 'country-emoji';
import useSwr from 'swr';
import Moment from 'react-moment';

import Stat from '../components/Stat';
import Map from '../components/Map';
import { CountryContext } from '../global-state/country';
import CountrySelector from '../components/CountrySelector';
import Donate from '../components/Donate';

const StyledIndex = styled.div`
    display: grid;
    grid-gap: 50px;
    justify-items: center;

    .title {
        font-size: 1.5em;

        @media screen and (min-width: 640px) {
            font-size: 2em;
        }
    }
    .main-stats {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;

        & > * {
            margin: 10px;
        }

        a {
            text-decoration: none;
        }
    }

    .reset-btn {
        border: 1px solid white;
        font-size: 0.7em;
        padding: 1em 2.5em;
        color: white;
        background-color: transparent;
        border-color: rgba(255, 255, 255, 0.5);
        font-weight: bold;
        outline: none;
        cursor: pointer;

        &:hover {
            border-color: rgba(255, 255, 255, 1);
        }
    }

    .feeling-unwell {
        opacity: 0.5;

        &:hover {
            opacity: 1;
        }
    }

    .last-updated {
        color: rgba(255, 255, 255, 0.5);
        font-size: 0.8em;

        .refresh {
            color: white;
            text-decoration: underline;
            cursor: pointer;
            transition: opacity 0.2s ease-in-out;

            &:hover {
                opacity: 0.5;
            }
        }
    }
`;

const stats = [
    {
        label: `Confirmed 😷`,
        value: `confirmed`,
        newValue: `new_confirmed`,
    },
    {
        label: `Recovered ✌️`,
        value: `recovered`,
        newValue: `new_recovered`,
    },
    {
        label: `Deaths 🙏`,
        value: `deaths`,
        newValue: `new_deaths`,
    },
];

const fetcher = url => fetch(url).then(res => res.json());

const Index = props => {
    // const initialData = props.data;
    const { data: timelineData, error: timelineError } = useSwr(
        'https://corona-api.com/timeline',
        fetcher
    );
    const { data: countriesData, error: countriesError } = useSwr(
        'https://corona-api.com/countries?include=timeline',
        fetcher
    );
    const { country, setCountry } = useContext(CountryContext);

    if (timelineError || countriesError) return <div>Failed to load users</div>;
    if (!timelineData || !countriesData) return <div>Loading...</div>;

    return (
        <StyledIndex>
            <h1 className={`title`}>
                Co<span className={`rona`}>rona</span>virus (COVID-19) Count{' '}
                {country ? flag(country) : `🌍`}
            </h1>
            <p className={`last-updated`}>
                Last updated: {` `}
                <Moment fromNow>
                    {country
                        ? countriesData.data.find(
                              countryData =>
                                  countryData.code.toLowerCase() === country
                          ).latest_data
                        : timelineData.updated_at}
                </Moment>
            </p>
            <div className={`main-stats`}>
                {stats.map(stat => {
                    let statData = timelineData.data[0];
                    if (country)
                        statData = countriesData.data.find(
                            countryData =>
                                countryData.code.toLowerCase() === country
                        ).latest_data;
                    return (
                        <Stat
                            name={stat.label}
                            value={statData[stat.value]}
                            newValue={statData[stat.newValue]}
                            key={stat.value}
                        />
                    );
                })}
            </div>
            <CountrySelector />
            <Map />

            <Donate />
            <a
                href={`https://www.nhs.uk/conditions/coronavirus-covid-19/`}
                target={`_blank`}
                className={`feeling-unwell`}
            >
                Feeling Unwell?
            </a>
        </StyledIndex>
    );
};

// export async function getServerSideProps() {
//     const data = await fetcher('https://corona-api.com/timeline');
//     return { props: { data } };
// }

export default Index;
