import React, { Component } from "react";
import { Modal, Button } from 'react-bootstrap';
import Plot from 'react-plotly.js';
import * as Utils from '../lib/utils';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class VerticallyCenteredModal extends Component {
  render() {
    return (
      <Modal
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {this.props.country ? Utils.titleCase(`${this.props.mapKey} of_${this.props.country}`) : ''}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {
            this.props.country == 'United States' ?
              <Plot
                data={[{
                  type: 'choropleth',
                  locationmode: 'USA-states',
                  locations: Utils.unpack(this.props.data, 'code'),
                  z: Utils.unpack(this.props.data, 'total'),
                  text: Utils.unpack(this.props.data, '_id'),
                  // zmin: 0,
                  // zmax: 17000,
                  colorscale: [
                    [0, 'rgb(242,240,247)'], [0.2, 'rgb(218,218,235)'],
                    [0.4, 'rgb(188,189,220)'], [0.6, 'rgb(158,154,200)'],
                    [0.8, 'rgb(117,107,177)'], [1, 'rgb(84,39,143)']
                  ],
                  colorbar: {
                    title: 'Number of people',
                    thickness: 0.2
                  },
                  marker: {
                    line: {
                      color: 'rgb(255,255,255)',
                      width: 2
                    }
                  }
                }]}

                layout={{
                  // title: Utils.titleCase(this.props.key),
                  geo: {
                    scope: 'usa',
                    showlakes: true,
                    lakecolor: 'rgb(255,255,255)'
                  }
                }}
              />
              : this.props.country == 'Canada' ?
              <Plot 
                data={
                  [{
                    x: Utils.unpack(this.props.data, '_id'),
                    y: Utils.unpack(this.props.data, 'total'),
                    type: 'bar',
                  }]
                }

                layout = {{
                  title: 'Number of people',
                  font:{
                    family: 'Raleway, sans-serif'
                  },
                  showlegend: false,
                  xaxis: {
                    tickangle: -45
                  },
                  yaxis: {
                    zeroline: false,
                    gridwidth: 2
                  },
                  bargap :0.05
                }}
              />
              : this.props.data[0] ? <h1>Total cases: {this.props.data[0].total}</h1> : ''
          }
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}