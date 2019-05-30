import React, {Component, Fragment} from 'react';
import './App.css';
import APIConnector from './api-connector'

import Chart from './Chart';

class App extends Component {

    constructor(props) {
        super(props);
        this.APIConnector = new APIConnector();
    }

    componentDidMount() {}

    render() {
        return (
            <div className="app-container">
                <Chart source={this.APIConnector}/>
            </div>
        )
    }
}


export default App;
