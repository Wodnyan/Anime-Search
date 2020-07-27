import React, { useState, useEffect, useReducer } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import styled from "styled-components";
import { UserContext } from "./context/UserContext";
//Reducer
import messageReducer from "./reducers/messageReducer";
//Views
import LandingPage from "./components/LandingPage/LandingPage";
import SearchPage from "./components/SearchPage/SearchPage";
//Components
import Message from "./components/Message/Message";
import { User, UserMessage } from "./interfaces";
//Style
import "./App.scss";

const MessageContainer = styled.aside`
    position: fixed;
    bottom: 1rem;
    right: 1rem;
`;

const App: React.FC = () => {
    const [user, setUser] = useState<User | null>(null);
    const [messages, messageDispatch] = useReducer(messageReducer, []);

    useEffect(() => {
        let fooInterval: any;

        if (!!messages.length) {
            const lastItem = messages[messages.length - 1].id;
            fooInterval = setInterval(() => {
                messageDispatch({ type: "remove", id: lastItem });
            }, 4000);
        } else {
            clearInterval(fooInterval);
        }

        return () => clearInterval(fooInterval);
    }, [messages]);

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
                messageDispatch({
                    type: "add",
                    message: {
                        message: `You logged in as ${user.username} with ${user.provider}`,
                        id: 0,
                    },
                });
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
                    <TransitionGroup className="message-list">
                        {(messages as UserMessage[]).map(
                            ({ message, id, type }) => (
                                <CSSTransition
                                    key={id}
                                    in={!!messages.length}
                                    classNames="message"
                                    unmountOnExit
                                    timeout={500}
                                >
                                    <Message
                                        type={type}
                                        closeMessage={() =>
                                            messageDispatch({
                                                type: "remove",
                                                id: id,
                                            })
                                        }
                                    >
                                        {message}
                                    </Message>
                                </CSSTransition>
                            )
                        )}
                    </TransitionGroup>
                </MessageContainer>
            </Router>
        </UserContext.Provider>
    );
};
export default App;
