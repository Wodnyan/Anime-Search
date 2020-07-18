import React from "react";
import styled, { keyframes } from "styled-components";

const spin = keyframes`
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
`;
const SpinnerContainer = styled.div`
    position: relative;
    width: 80px;
    height: 80px;
    > div {
        position: absolute;
        width: 64px;
        height: 64px;
        border-radius: 50%;
        border: 8px solid;
        border-color: #000 transparent transparent transparent;
        animation: ${spin} 1s infinite;
        &:nth-child(1) {
            animation-delay: 0.1s;
        }
        &:nth-child(2) {
            animation-delay: 0.2s;
        }
        &:nth-child(3) {
            animation-delay: 0.3s;
        }
    }
`;

const Spinner: React.FC = () => {
    return (
        <SpinnerContainer>
            <div></div>
            <div></div>
            <div></div>
        </SpinnerContainer>
    );
};
export default Spinner;
