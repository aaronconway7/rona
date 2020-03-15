import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import fetch from 'isomorphic-unfetch';
import Moment from 'react-moment';
import { flag } from 'country-emoji';

import Stat from '../components/Stat';
import Map from '../components/Map';
import { CountryContext } from '../global-state/country';
import CountrySelector from '../components/CountrySelector';

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

            .who {
                background-color: #018dc9;

                &:hover {
                    background-color: transparent;
                    color: #018dc9;
                    border: 1px solid #018dc9;
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

const Index = ({ data }) => {
    const [countryData, setCountryData] = useState({
        ...data.results[0],
    });
    const [lastUpdate, setLastUpdate] = useState(new Date());
    const { country, setCountry } = useContext(CountryContext);
    const {
        total_cases,
        total_recovered,
        total_deaths,
        total_new_cases_today,
        total_new_deaths_today,
    } = countryData;

    useEffect(() => {
        getCountryData(country);
    }, [country]);

    const getCountryData = async country => {
        try {
            let res;
            if (country) {
                res = await fetch(
                    `https://thevirustracker.com/free-api?countryTotal=${country}`
                );
            } else {
                res = await fetch(
                    `https://thevirustracker.com/free-api?global=stats`
                );
            }
            const data = await res.json();
            if (!res.ok) throw data.error.message;
            if (country) {
                setCountryData({
                    ...data.countrydata[0],
                });
            } else {
                setCountryData({
                    ...data.results[0],
                });
            }
            // setLastUpdate(new Date());
        } catch (error) {
            console.log(error);
            setCountry(null);
        }
    };

    const resetCountry = () => {
        setCountry(null);
    };

    const handleRefresh = () => {
        getCountryData(country);
        setLastUpdate(new Date());
    };

    return (
        <StyledIndex>
            <h1 className={`title`}>
                Co<span className={`rona`}>rona</span>virus (COVID-19) Count{' '}
                {country ? flag(country) : `🌍`}
            </h1>
            <span className={`last-updated`}>
                Last Updated: <Moment fromNow>{lastUpdate}</Moment> -{' '}
                <span onClick={() => handleRefresh()} className={`refresh`}>
                    Refresh
                </span>
            </span>
            <div className={`main-stats`}>
                <Stat
                    name={`Confirmed 😷`}
                    value={total_cases}
                    newValue={total_new_cases_today}
                />
                <Stat name={`Recovered ✌️`} value={total_recovered} />
                <Stat
                    name={`Deaths 🙏`}
                    value={total_deaths}
                    newValue={total_new_deaths_today}
                />
            </div>
            <CountrySelector />
            <Map />
            <div className={`donate`}>
                <p>
                    For the price of a pack of Corona 🍻, you could help some
                    people.
                </p>
                <div className={`buttons`}>
                    <a
                        href={`https://covid19responsefund.org/`}
                        className={`who`}
                        target={`_blank`}
                    >
                        WHO
                    </a>
                    <a
                        href={`https://www.globalgiving.org/projects/coronavirus-relief-fund/`}
                        className={`global-giving`}
                        target={`_blank`}
                    >
                        Global Giving
                    </a>
                    <a
                        href={`https://www.unicef.org.uk/donate/coronavirus/`}
                        className={`unicef`}
                        target={`_blank`}
                    >
                        Unicef
                    </a>
                </div>
            </div>
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

// This gets called on every request
export async function getServerSideProps() {
    // Fetch data from external API
    const res = await fetch(
        `https://thevirustracker.com/free-api?global=stats`
    );
    const data = await res.json();

    // Pass data to the page via props
    return { props: { data } };
}

export default Index;
