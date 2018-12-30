import React, { Component } from 'react';
import { Router, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import App from './components/App';

const customHistory = createBrowserHistory();


class MainApp extends Component {
    render() {
        return (
            <Router history={customHistory} >
            <Route path="/" component={App} />    
          </Router>
        );
    }
}

export default MainApp;