import React from "react";
import ReactDOM from "react-dom";
import { AppContainer } from "react-hot-loader";
import Root from "./Root";

// Require globals
import "babel-polyfill";
import "./static/scss/style.scss";
import "lodash";

//this is a cheap way to get around FOUC on dev - gotta check if it still does it on Production
if (window.location.href.indexOf("localhost") > -1) {
    setTimeout(() => {
        ReactDOM.render(
            <AppContainer>
                <Root />
            </AppContainer>,
            document.getElementById("root")
        );
    }, 50);
} else {
    ReactDOM.render(
        <AppContainer>
            <Root />
        </AppContainer>,
        document.getElementById("root")
    );
}

// Hot Module Replacement API
if (module.hot) {
    module.hot.accept("./Root", () => {
        const NextApp = require("./Root").default;
        ReactDOM.render(
            <AppContainer>
                <NextApp />
            </AppContainer>,
            document.getElementById("root")
        );
    });
}
