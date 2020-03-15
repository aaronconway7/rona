import styled from 'styled-components';
import AnimatedNumber from 'react-animated-number';

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

    .new-cases {
        margin-top: 10px;

        .new-label {
            font-size: 0.8em;
            /* margin-right: 0.4em; */
        }
    }
`;

const Stat = ({ name, value, newValue }) => (
    <StyledStat>
        <h2 className={`name`}>{name}</h2>
        <AnimatedNumber
            component="text"
            value={value}
            style={{
                transition: '0.8s ease-out',
                fontSize: 48,
                transitionProperty: 'background-color, color, opacity',
                fontSize: '3em',
                opacity: '0.5',
            }}
            frameStyle={perc =>
                perc === 100 ? {} : { backgroundColor: '#ffeb3b' }
            }
            duration={300}
            formatValue={n => n.toLocaleString()}
        />
        {newValue && (
            <div className={`new-cases`}>
                <span className={`new-label`}>new today - </span>
                <AnimatedNumber
                    component="text"
                    value={newValue}
                    style={{
                        transition: '0.8s ease-out',
                        transitionProperty: 'background-color, color, opacity',
                        fontSize: '1em',
                        opacity: '0.5',
                    }}
                    frameStyle={perc =>
                        perc === 100 ? {} : { backgroundColor: '#ffeb3b' }
                    }
                    duration={300}
                    formatValue={n => n.toLocaleString()}
                />
            </div>
        )}
    </StyledStat>
);

export default Stat;
