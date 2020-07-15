import React from "react";
import styled from "styled-components";
import { CircularButton } from "../Buttons/Buttons";
import { Link } from "react-router-dom";
//Icons
import githubLogo from "../../icons/github.svg";
import facebookLogo from "../../icons/facebook.svg";
import twitterLogo from "../../icons/twitter.svg";

const StyledLink = styled(Link)`
    margin: 1rem 0;
    padding: 0.8rem 3.5rem;
    border-radius: 10px;
    background-color: red;
    text-decoration: none;
    color: var(--text-color);
    &:active {
    }
`;

const LandingPageContainer = styled.main`
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

const CallToAction = styled.h1`
    font-size: 5rem;
    font-family: var(--title-font);
    color: red;
`;

const LandingPage: React.FC = () => {
    function openWindow(
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) {
        const provider = event.currentTarget.children[0].getAttribute(
            "data-provider"
        );
        console.log(provider);
    }

    return (
        <LandingPageContainer>
            <CallToAction>Search For Anime!</CallToAction>
            <StyledLink to="/search">Search as a Guest</StyledLink>
            <div className="oatuh-container">
                <CircularButton onClick={openWindow}>
                    <img
                        src={githubLogo}
                        alt="github logo"
                        data-provider="github"
                    />
                </CircularButton>
                <CircularButton onClick={openWindow}>
                    <img
                        src={facebookLogo}
                        alt="facebook logo"
                        data-provider="facebook"
                    />
                </CircularButton>
                <CircularButton onClick={openWindow}>
                    <img
                        src={twitterLogo}
                        alt="twitter logo"
                        data-provider="twitter"
                    />
                </CircularButton>
            </div>
        </LandingPageContainer>
    );
};
export default LandingPage;
