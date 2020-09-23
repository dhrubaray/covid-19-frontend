import React, { Component } from 'react';
import Plot from 'react-plotly.js';
import * as Utils from '../lib/utils';


export default class Map extends Component {
    render() {
        return (
            <Plot
                data={[{
                    type: 'choropleth',
                    locationmode: 'country names',
                    locations: Utils.unpack(this.props.data, '_id'),
                    z: Utils.unpack(this.props.data, 'total'),
                    // text: Utils.unpack(this.props.data, 'total'),
                    // colorscale: 'Rainbow',
                    autocolorscale: true
                }]}

                layout={{
                    title: Utils.titleCase(`${this.props.mapKey} of_${this.props.continent}`),
                    geo: {
                        projection: {
                            type: 'robinson'
                        }
                    }
                }}

                onClick={(data) => this.props.onClick(true, data)}
            />
        );
    }
}
