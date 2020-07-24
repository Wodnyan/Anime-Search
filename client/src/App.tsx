import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import styled from "styled-components";
import { UserContext } from "./context/UserContext";
//Views
import LandingPage from "./components/LandingPage/LandingPage";
import SearchPage from "./components/SearchPage/SearchPage";
//Components
import Message from "./components/Message/Message";
import { User, UserMessage } from "./interfaces";
//Style
import "./App.scss";

const MessageContainer = styled.aside`
    position: absolute;
    bottom: 1rem;
    right: 1rem;
`;

const App: React.FC = () => {
    const [messages, setMessages] = useState<UserMessage[] | []>([]);
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        async function getUserData() {
            const httpHeaders = {
                Accept: "application/json",
                "Content-Type": "application/json",
                "Access-Control-Allow-Credentials": "true",
            };
            const headers = new Headers(httpHeaders);
            const authenticate = await fetch(
                "http://localhost:5050/auth/login",
                {
                    method: "GET",
                    headers: headers,
                    credentials: "include",
                }
            );
            if (authenticate.status === 200) {
                const { user } = await authenticate.json();
                setUser(user);
                setMessages((prev) => [
                    ...prev,
                    {
                        id: prev.length,
                        message: `You logged in as ${user.username} with ${user.provider}`,
                    },
                ]);
            } else {
                console.log("There was an oopsie");
            }
        }
        getUserData();
    }, []);

    return (
        <UserContext.Provider value={user}>
            <Router>
                <a href="http://localhost:5050/auth/logout">Logout</a>
                <Switch>
                    <Route exact path="/" component={LandingPage} />
                    <Route path="/search" component={SearchPage} />
                </Switch>
                <MessageContainer>
                    <CSSTransition
                        in={!!messages.length}
                        classNames="fade"
                        unmountOnExit
                        timeout={1000}
                    >
                        <React.Fragment>
                            {(messages as UserMessage[]).map(
                                ({ message, type, id }) => (
                                    <Message key={id}>{message}</Message>
                                )
                            )}
                        </React.Fragment>
                    </CSSTransition>
                </MessageContainer>
            </Router>
        </UserContext.Provider>
    );
};
export default App;
