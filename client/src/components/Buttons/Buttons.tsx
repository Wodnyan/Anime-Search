import styled from "styled-components";

const Button = styled.button`
    display: inline-block;
    margin: 0.5rem 1rem;
    padding: 0.5rem 2rem;
    border: none;
    outline: none;
    border-radius: 5px;
    background-color: red;
    color: #fff;
    cursor: pointer;
`;

export const CircularButton = styled(Button)<{ size?: number }>`
    display: inline-flex;
    justify-content: center;
    align-items: center;
    padding: 0.7rem;
    width: ${(props) => props.size || 45}px;
    height: ${(props) => props.size || 45}px;
    border-radius: 50%;
`;

export default Button;
