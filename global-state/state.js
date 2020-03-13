import React from 'react';

import { CountryProvider } from './country';

// Take in all of the providers and combine them
const ProviderComposer = ({ contexts, children }) => {
    return contexts.reduceRight(
        (kids, parent) =>
            React.cloneElement(parent, {
                children: kids,
            }),
        children
    );
};

// Create one Context Provider
const ContextProvider = ({ children }) => {
    return (
        <ProviderComposer contexts={[<CountryProvider />]}>
            {children}
        </ProviderComposer>
    );
};

export default ContextProvider;
