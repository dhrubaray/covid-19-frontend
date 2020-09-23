import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

export default class DataTable extends Component {
    render() {
        const { SearchBar } = Search;
        const columns = [{
            dataField: '_id',
            text: 'Country',
            sort: true,
        }, {
            dataField: 'total',
            text: 'Total Cases',
            searchable: false,
            sort: true,
        }];

        return (
            <ToolkitProvider
                keyField="_id"
                data={this.props.data}
                columns={columns}
                search
            >
                {
                    props => (
                        <div>
                            <h3>Enter Country Name:</h3>
                            <SearchBar {...props.searchProps} />
                            <hr />
                            <BootstrapTable
                                { ...props.baseProps }
                                keyField='_id'
                                data={this.props.data}
                                columns={columns}
                                striped
                                hover
                                condensed
                                pagination={paginationFactory()}
                                rowEvents={{onClick: (e, row, rowIndex)=>this.props.onClick(true, row)}}
                            />
                        </div>
                    )
                }
            </ToolkitProvider>

        )
    }
}
