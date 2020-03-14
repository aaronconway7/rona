import App from 'next/app';
import Head from 'next/head';
import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { Normalize } from 'styled-normalize';

import ContextProvider from '../global-state/state';
import { GA_TRACKING_ID } from '../lib/gtag';

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

    a {
        color: inherit;
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

const StyledMain = styled.main`
    display: grid;
    grid-gap: 50px;
    justify-items: center;
    .title {
        text-align: center;
        .rona {
            color: #d82239;
        }
    }
`;

export default class MyApp extends App {
    render() {
        const { Component, pageProps } = this.props;
        return (
            <ContextProvider>
                <StyledApp>
                    <Head>
                        <title>Coronavirus (COVID-19) Live Counter</title>
                        <meta
                            name="description"
                            content="Live (-ish) counter of the Coronavirus (COVID-19) showing Confirmed, Recovered and Deaths numbers worldwide and country specific."
                        ></meta>
                        <link rel="canonical" href="https://rona.live" />
                        <meta name="theme-color" content="#101010"></meta>
                        <link
                            rel={`apple-touch-icon`}
                            sizes={`180x180`}
                            href={`/apple-touch-icon.png`}
                        />
                        <link
                            rel={`icon`}
                            type={`image/png`}
                            sizes={`32x32`}
                            href={`/favicon-32x32.png`}
                        />
                        <link
                            rel={`icon`}
                            type={`image/png`}
                            sizes={`16x16`}
                            href={`/favicon-16x16.png`}
                        />
                        <link rel={`manifest`} href={`/site.webmanifest`} />
                        {/* Global Site Tag (gtag.js) - Google Analytics */}
                        <script
                            async
                            src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
                        />
                        <script
                            dangerouslySetInnerHTML={{
                                __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
                            }}
                        />
                        <meta
                            property="og:title"
                            content="Coronavirus (COVID-19) Live (-ish) Counter"
                        />
                        <meta
                            property="og:description"
                            content="Live (-ish) counter of the Coronavirus (COVID-19) showing Confirmed, Recovered and Deaths numbers worldwide and country specific."
                        />
                        <meta
                            property="og:image"
                            content="https://covid19.mathdro.id/api/og"
                        />
                        <meta property="og:url" content="https://rona.live" />
                        <meta
                            name="twitter:title"
                            content="Coronavirus (COVID-19) Live (-ish) Counter"
                        />
                        <meta
                            name="twitter:description"
                            content="Live (-ish) counter of the Coronavirus (COVID-19) showing Confirmed, Recovered and Deaths numbers worldwide and country specific."
                        />
                        <meta
                            name="twitter:image"
                            content="https://covid19.mathdro.id/api/og"
                        />
                        <meta
                            name="twitter:card"
                            content="summary_large_image"
                        />
                    </Head>
                    <GlobalStyle />
                    <StyledMain>
                        <Component {...pageProps} />
                    </StyledMain>
                    <p className={`made-by`}>
                        Made by{' '}
                        <a href={`https://aaronconway.co.uk`} target={`_blank`}>
                            Aaron
                        </a>
                    </p>
                </StyledApp>
            </ContextProvider>
        );
    }
}
