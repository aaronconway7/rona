import styled from 'styled-components';

const StyledDonate = styled.div`
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
`;

const donate = [
    {
        label: `WHO`,
        class: `who`,
        link: `https://covid19responsefund.org/`,
    },
    {
        label: `Global Giving`,
        class: `global-giving`,
        link: `https://www.globalgiving.org/projects/coronavirus-relief-fund/`,
    },
    {
        label: `Unicef`,
        class: `unicef`,
        link: `https://www.unicef.org.uk/donate/coronavirus/`,
    },
];

const Donate = () => (
    <StyledDonate className={`donate`}>
        <p>For the price of a pack of Corona 🍻, you could help some people.</p>
        <div className={`buttons`}>
            {donate.map(button => (
                <a
                    href={button.link}
                    className={button.class}
                    target={`_blank`}
                    key={button.class}
                >
                    {button.label}
                </a>
            ))}
        </div>
    </StyledDonate>
);

export default Donate;
