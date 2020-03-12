import App from 'next/app';
import Head from 'next/head';
import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { Normalize } from 'styled-normalize';

const GlobalStyle = createGlobalStyle`
    ${Normalize};

    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    
    body {
        min-height: 100vh;
        background-color: #101010;
        color: white;
        font-family: 'Source Code Pro', 'Roboto Mono', monospace;
        padding: 75px 25px;

        @media screen and (min-width: 500px) {
            padding: 75 50px;
        }

        @media screen and (min-width: 640px) {
            padding: 100px;
        }
    }
`;

const StyledApp = styled.div`
    .made-by {
        position: absolute;
        top: 10px;
        right: 10px;
        font-size: 0.8em;

        a {
            color: white;
            opacity: 0.5;

            &:hover {
                opacity: 1;
            }
        }
    }
`;

export default class MyApp extends App {
    render() {
        const { Component, pageProps } = this.props;
        return (
            <StyledApp>
                <Head>
                    <title>Coronavirus (COVID-19) Live Counter</title>
                    <link
                        rel={`shortcut icon`}
                        href={`/assets/img/favicon.png`}
                    />
                </Head>
                <GlobalStyle />
                <Component {...pageProps} />
                <p className={`made-by`}>
                    Made by{' '}
                    <a href={`https://aaronconway.co.uk`} target={`_blank`}>
                        Aaron
                    </a>
                </p>
            </StyledApp>
        );
    }
}
