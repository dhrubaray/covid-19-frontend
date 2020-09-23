import React, { Component } from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as Constants from '../constants';

export default class MenuBar extends Component {
    render() {
        return (
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                {/*
                <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
*/}
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto" onSelect={this.props.onSelect}>
                        <NavDropdown title="Maps" id="collasible-nav-dropdown">
                            {
                                Constants.MAPS.map(
                                    type => <NavDropdown.Item key={type} eventKey={type}>{type.split('_').join(' ')}</NavDropdown.Item>
                                )
                            }
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}