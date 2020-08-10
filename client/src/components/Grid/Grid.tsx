import styled from "styled-components";

export const Grid = styled.section`
    display: grid;
    grid-template-columns: repeat(3, 350px);
    grid-gap: 1em;
    @media (max-width: 768px) {
        grid-template-columns: 1fr;
        > div {
            justify-self: center;
            align-self: center;
        }
    }
`;
