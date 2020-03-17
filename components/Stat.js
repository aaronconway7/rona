import styled from 'styled-components';
import AnimatedNumber from 'react-animated-number';
import { ClockLoader } from 'react-spinners';

const StyledStat = styled.div`
    display: grid;
    grid-gap: 5px;
    justify-items: center;
    background-color: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.2);
    text-align: center;
    padding: 1em;
    width: 350px;

    .name {
        font-size: 1em;
    }

    .new-cases {
        .new-label {
            font-size: 0.8em;

            .value {
                font-size: 1em;
                opacity: 0.5;
            }
        }
    }
`;

const Stat = ({ name, value, newValue, loading }) => (
    <StyledStat>
        <h2 className={`name`}>{name}</h2>
        {loading ? (
            <ClockLoader color={`#d82239`} />
        ) : (
            <>
                <AnimatedNumber
                    component="span"
                    value={value}
                    style={{
                        transition: '0.8s ease-out',
                        fontSize: 48,
                        transitionProperty: 'background-color, color, opacity',
                        fontSize: '3em',
                        opacity: '0.5',
                    }}
                    frameStyle={perc =>
                        perc === 100 || Number.isNaN(perc)
                            ? {}
                            : { backgroundColor: '#ffeb3b' }
                    }
                    duration={300}
                    formatValue={n => n.toLocaleString()}
                />
                <div className={`new-cases`}>
                    <span className={`new-label`}>
                        new today -{' '}
                        <span className={`value`}>
                            {newValue || newValue === 0
                                ? newValue.toLocaleString()
                                : `N/A`}
                        </span>
                    </span>
                </div>
            </>
        )}
    </StyledStat>
);

export default Stat;
