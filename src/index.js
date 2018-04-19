import React from 'react'
import { Provider } from 'react-redux';
import { render } from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { Switch, Route } from 'react-router'
import App from './containers/App';
import store from './store'

render(
    <Provider store={store}>
        <Router>
            <Switch>
                <Route path="/" component={App} />
            </Switch>
        </Router>
    </Provider>,
    document.getElementById( 'root' )
)


