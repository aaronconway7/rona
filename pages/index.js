import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import fetch from 'isomorphic-unfetch';
import Moment from 'react-moment';
import { flag } from 'country-emoji';

import Stat from '../components/Stat';
import Map from '../components/Map';
import { CountryContext } from '../global-state/country';

const StyledIndex = styled.div`
    display: grid;
    grid-gap: 50px;
    justify-items: center;
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

    .donate {
        display: grid;
        text-align: center;
        grid-gap: 25px;

        .buttons {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            .unicef {
                background-color: #02aeef;

                &:hover {
                    background-color: transparent;
                    color: #02aeef;
                    border: 1px solid #02aeef;
                }
            }
            .global-giving {
                background-color: #df7c1d;

                &:hover {
                    background-color: transparent;
                    color: #df7c1d;
                    border: 1px solid #df7c1d;
                }
            }

            a {
                color: white;
                padding: 1em;
                min-width: 200px;
                border: 1px solid transparent;
                margin: 10px;
            }
        }
    }

    .last-updated {
        opacity: 0.5;
        font-size: 0.8em;
    }
`;

const Index = ({ data }) => {
    const [countryData, setCountryData] = useState({
        confirmed: data.confirmed,
        recovered: data.recovered,
        deaths: data.deaths,
        lastUpdate: data.lastUpdate,
    });
    const { country, setCountry } = useContext(CountryContext);
    const { confirmed, recovered, deaths, lastUpdate } = countryData;

    useEffect(() => {
        getCountryData(country);
    }, [country]);

    const getCountryData = async country => {
        try {
            let res;
            if (country) {
                res = await fetch(
                    `https://covid19.mathdro.id/api/countries/${country}`
                );
            } else {
                res = await fetch(`https://covid19.mathdro.id/api`);
            }
            const data = await res.json();
            if (!res.ok) throw data.error.message;
            setCountryData({
                ...data,
            });
        } catch (error) {
            console.log(error);
            setCountry(null);
        }
    };

    const resetCountry = () => {
        setCountry(null);
    };

    return (
        <StyledIndex>
            <h1 className={`title`}>
                Co<span className={`rona`}>rona</span>virus (COVID-19) Count{' '}
                {country ? flag(country) : `🌍`}
            </h1>
            <span className={`last-updated`}>
                Last Updated:{' '}
                <Moment fromNow>{lastUpdate && lastUpdate}</Moment>
            </span>
            <div className={`main-stats`}>
                <Stat
                    name={`Confirmed 😷`}
                    value={confirmed && confirmed.value}
                />
                <Stat
                    name={`Recovered ✌️`}
                    value={recovered && recovered.value}
                />
                <Stat name={`Deaths 🙏`} value={deaths && deaths.value} />
            </div>
            {country && (
                <button className={`reset-btn`} onClick={() => resetCountry()}>
                    Reset to 🌍
                </button>
            )}
            <Map />
            <div className={`donate`}>
                <p>
                    For the price of a pack of Corona 🍻, you could help some
                    people.
                </p>
                <div className={`buttons`}>
                    <a
                        href={`https://www.unicef.org.uk/donate/coronavirus/`}
                        className={`unicef`}
                    >
                        Unicef
                    </a>
                    <a
                        href={`https://www.globalgiving.org/projects/coronavirus-relief-fund/`}
                        className={`global-giving`}
                    >
                        Global Giving
                    </a>
                </div>
            </div>
        </StyledIndex>
    );
};

// This gets called on every request
export async function getServerSideProps() {
    // Fetch data from external API
    const res = await fetch(`https://covid19.mathdro.id/api`);
    const data = await res.json();

    // Pass data to the page via props
    return { props: { data } };
}

export default Index;
