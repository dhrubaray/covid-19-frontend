import React, { Component } from 'react';
import * as Constants from '../constants';
import MenuBar from './MenuBar';
import DropdownMenu from './DropdownMenu';
import DataTable from './DataTable';
import Map from './Map';
import axios from 'axios';
import '../stylesheets/styles.css';
import VerticallyCenteredModal from './VerticallyCenteredModal';

export default class Covid19 extends Component {
    constructor(props) {
        super(props);

        this.handleMenuSelect = this.handleMenuSelect.bind(this);
        this.handleContinentSelect = this.handleContinentSelect.bind(this);
        this.handleModalShow = this.handleModalShow.bind(this);

        this.state = {
            key: 'PEOPLE_POSITIVE_CASES_COUNT',
            continent: 'All',
            continents: ['All'],
            data: [],
            modalShow: false,
            country: '',
            countryData: [],
        }
    }

    componentDidMount() {
        console.log("@@@" + this.state.key);
        console.log("@@@" + this.state.continent);
        axios.get(Constants.CORS_CONTINENTS_URL)
            .then(res => {
                this.setState(
                    {
                        ...this.state,
                        continents: this.state.continents.concat(res.data.continents),
                    },
                    () => {
                        this.handleContinentSelect('All');
                    }
                );
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    handleMenuSelect(key) {
        this.setState(
            {
                ...this.state,
                key: key,
            },
            () => {
                console.log(this.state.key);
                this.handleContinentSelect(this.state.continent);
            }
        );
    }

    handleContinentSelect(continent) {
        console.log(this.state.continent);

        const url = `${Constants.CORS_CONTINENT_URL}/${this.state.key}/${continent}`;
        axios.get(url)
            .then(res => {
                this.setState(
                    {
                        ...this.state,
                        continent: continent,
                        data: res.data.result,
                    }
                );
                console.log(res);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    handleModalShow(modalShow, data) {
        console.log(data);
        this.setState({ ...this.state, modalShow: modalShow },
            () => {
                if (!this.state.modalShow) this.setState({ ...this.state, country: '', countryData: [] });
                let country = null;
                if (data) {
                    if (data._id)
                        country = data._id;
                    else
                        country = data.points[0].location;
                    //    this.setState({ ...this.state, country:  country});
                    const url = `${Constants.CORS_COUNTRY_URL}/${this.state.key}/${country}`;
                    axios.get(url)
                        .then(res => {
                            this.setState(
                                {
                                    ...this.state,
                                    country: country,
                                    countryData: res.data.result,
                                }
                            );
                            console.log(res);

                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                }
            });
    }

    render() {
        return (
            <div className='covid-19'>
                <MenuBar onSelect={this.handleMenuSelect} />
                <DropdownMenu continents={this.state.continents} onSelect={this.handleContinentSelect} />
                <Map mapKey={this.state.key} continent={this.state.continent} data={this.state.data} onClick={this.handleModalShow} />
                <DataTable data={this.state.data} onClick={this.handleModalShow} />
                <VerticallyCenteredModal
                    show={this.state.modalShow}
                    onHide={() => this.handleModalShow(false)}
                    country={this.state.country}
                    data={this.state.countryData}
                    mapKey={this.state.key}
                />
            </div>
        );
    }
}