import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import styled from "styled-components";
import githubLogo from "./icons/github.svg";
import "./App.scss";
import Button, { CircularButton } from "./components/Buttons/Buttons";

const LandingPageContainer = styled.main`
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

const CallToAction = styled.h1`
    color: red;
`;

const App: React.FC = () => {
    return (
        <Router>
            <Route path="/">
                <LandingPageContainer>
                    <CallToAction>Search For Anime!</CallToAction>
                    <Button>Search as a Guest</Button>
                    <div className="oatuh-container">
                        <CircularButton>
                            <img src={githubLogo} alt="github logo" />
                        </CircularButton>
                        <CircularButton>
                            <img src={githubLogo} alt="github logo" />
                        </CircularButton>
                        <CircularButton>
                            <img src={githubLogo} alt="github logo" />
                        </CircularButton>
                    </div>
                </LandingPageContainer>
            </Route>
        </Router>
    );
};
export default App;
