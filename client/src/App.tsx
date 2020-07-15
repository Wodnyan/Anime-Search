import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage";
import "./App.scss";

const App: React.FC = () => {
    return (
        <Router>
            <Route exact path="/" component={LandingPage} />
            <Route path="/search"></Route>
        </Router>
    );
};
export default App;
