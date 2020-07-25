import React from "react";
import styled from "styled-components";

interface MessageContainerProps {
    type?: "error" | "warning";
}
interface Props {
    children: React.ReactNode;
    type?: "error" | "warning";
    closeMessage?: () => void;
}

const MessageContainer = styled.div<MessageContainerProps>`
    position: relative;
    margin: 1rem;
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
    .close-message-button {
        position: absolute;
        top: 5px;
        right: 5px;
        cursor: pointer;
    }
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
const Message: React.SFC<Props> = ({ children, type, closeMessage }) => {
    return (
        <MessageContainer type={type}>
            <span className="close-message-button" onClick={closeMessage}>
                X
            </span>
            {children}
        </MessageContainer>
    );
};

export default Message;
