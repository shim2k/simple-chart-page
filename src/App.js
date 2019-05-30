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
                <div style={{margin: '15px', color: 'black'}}>The code available at: <a href="https://github.com/Shim2k/simple-chart-page/tree/master/src">Github</a></div>

                <Chart source={this.APIConnector}/>
            </div>
        )
    }
}


export default App;
