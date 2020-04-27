import React, { Component } from 'react';
import roteirosApi from '../../scripts/api/roteiros';
import usersApi from '../../scripts/api/users';

export default class RoutesList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            "roteiros": {},
            "current_page":1,
            "last_page":null
        };

        usersApi.validateAuth(this.props);

        this.getRoutesList();
    }

    render() {
        return " hello roteirosList"
    }

    getRoutesList() {
        roteirosApi.list().then( (response) => {
            this.setState({roteiros:response.data});
            console.log(this.state);
        })
    }
}