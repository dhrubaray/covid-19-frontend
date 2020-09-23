import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Map from './Map';
import Dropdown from './DropdownMenu';

export default class Routing extends Component {
    render() {
        return (
            <Router>
                <Route path="/continent/:key/:continent" exact component={Dropdown} />
                <Route path="/continent/:key/:continent" exact component={Map} />
            </Router>
        );
    }
}