import React, { Component } from 'react';
import { Dropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class DropdownMenu extends Component {
    render() {
        let continentsList = this.props.continents.map(
            continent => <Dropdown.Item key={continent} eventKey={continent}> {continent} </Dropdown.Item>
        );
        return (
            <Dropdown onSelect={this.props.onSelect}>
                <Dropdown.Toggle variant="success"
                    id="dropdown-basic" >
                    Continents
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    {continentsList}
                </Dropdown.Menu>
            </Dropdown>
        );
    }
}
