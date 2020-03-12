import React from 'react';
import styled from 'styled-components';
import fetch from 'isomorphic-unfetch';
import Moment from 'react-moment';

import Stat from '../components/Stat';

const StyledIndex = styled.div`
    display: grid;
    grid-gap: 50px;
    justify-items: center;
    .title {
        text-align: center;
        .rona {
            color: #d82239;
        }
    }

    .main-stats {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;

        & > * {
            margin: 10px;
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
    const { confirmed, recovered, deaths, lastUpdate } = data;
    return (
        <StyledIndex>
            <h1 className={`title`}>
                Co<span className={`rona`}>rona</span>virus (COVID-19) Count
            </h1>
            <div className={`main-stats`}>
                <Stat name={`Confirmed 😷`} value={confirmed.value} />
                <Stat name={`Recovered ✌️`} value={recovered.value} />
                <Stat name={`Deaths 💀🙏`} value={deaths.value} />
            </div>
            <div className={`donate`}>
                <p>For the price of a pack of Corona 🍻, you could help.</p>
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
            <span className={`last-updated`}>
                Last Updated: <Moment fromNow>{lastUpdate}</Moment>
            </span>
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
