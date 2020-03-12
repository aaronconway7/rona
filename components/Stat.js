import styled from 'styled-components';

const StyledStat = styled.div`
    display: grid;
    background-color: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.2);
    text-align: center;
    padding: 1em;
    width: 350px;

    .name {
        font-size: 1em;
    }

    .value {
        font-size: 3em;
        opacity: 0.5;
    }

    /* .blinking {
        animation: blinkingText 1.2s infinite;
    }
    @keyframes blinkingText {
        0% {
            color: white;
        }
        49% {
            color: white;
        }
        60% {
            color: transparent;
        }
        99% {
            color: transparent;
        }
        100% {
            color: white;
        } */
    }
`;

const Stat = ({ name, value }) => (
    <StyledStat>
        <h2 className={`name`}>{name}</h2>
        <span className={`value blinking`}>{value.toLocaleString()}</span>
    </StyledStat>
);

export default Stat;
