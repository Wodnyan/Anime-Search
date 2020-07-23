import styled from "styled-components";

interface Props {
    type?: "error" | "warning";
}

const Message = styled.div<Props>`
    padding: 1.5rem;
    border-radius: 0.5rem;
    background: ${(props) =>
        props.type === "error"
            ? "#cc0000"
            : props.type === "warning"
            ? "#FFCC00"
            : "#1C1C1C"};
    color: #fff;
    transition: opacity 0.3s ease;
    &.fade-enter {
        opacity: 0;
    }
    &.fade-enter-active {
        opacity: 1;
    }
    &.fade-exit {
        opacity: 1;
    }
    &.fade-exit-active {
        opacity: 0;
    }
`;

export default Message;
