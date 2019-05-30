import React, {Component} from 'react';
import './chart.css';

import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine, ResponsiveContainer
} from 'recharts';
import ChartOptions from "./ChartOptions";

import {Legend, ErrorMessage, ToolTipContent} from "./utils";

class Chart extends Component {
    constructor() {
        super();
        this.state = {
            scale: [0, 1],
            threshold: 0,
            dataPoints: 0,
            AllData: null,
            visibleData: null,
            error: null
        };
    }

    static defaultProps = {
        data: []
    }

    async componentDidMount() {
        if (this.props.source) {
            try {
                let {data, meta} = await this.props.source.getDataPoints();
                let scale = this.getScale(data);
                this.setState({allData: data, visibleData: data, meta, scale, dataPoints: data.length});
            } catch (e) {
                this.setState({error: e})
            }
        }
    }

    updateDataByPoints(points) {
        let {allData} = this.state;
        let p = parseInt(points);

        if (Number.isNaN(p)) return;
        if (p > allData.length) return;

        this.setState({dataPoints: points})


        let visibleData = allData.slice((allData.length-p))
        this.setState({visibleData});
    }

    getScale(data) {
        // finding out the minimum and maximum values
        let scale = data
            .map(p => p.point)
            .reduce((scale, currentPoint) => {
                let [min, max] = scale;

                if (min === 0)
                    min = currentPoint

                min = min < currentPoint ? min : currentPoint;
                max = max > currentPoint ? max : currentPoint;

                return [min, max];
            }, this.state.scale);

        scale[0] = Number(scale[0].toFixed(2));
        scale[1] = Number((scale[1] + 0.1).toFixed(2));

        return scale;
    }

    render() {
        let {scale, visibleData, meta, threshold, dataPoints, error} = this.state;

        if (!threshold)
            threshold = (scale[0] + scale[1]) / 2;

        return (
            error ? <ErrorMessage message={error.message}/> :
                visibleData ?
                    <div className={'chart-wrapper'}>
                        <ChartOptions dataPoints={dataPoints} threshold={threshold}
                                      setDataPoints={this.updateDataByPoints.bind(this)}
                                      setThreshold={threshold => this.setState({threshold})}/>
                        <ChartWrapper data={visibleData} meta={meta} threshold={threshold}/>
                    </div>
                    : null
        )
    }
}

function ChartWrapper({data, meta, threshold}) {
    return (
        <div className={'chart-container'}>
            <ResponsiveContainer width={'100%'} height={300}>
                <LineChart
                    data={data}
                    margin={{}}>
                    <CartesianGrid strokeDasharray="3 3"/>
                    <XAxis dataKey="label" domain={['dataMin', 'dataMax']}/>
                    <YAxis type="number" domain={['auto', 'auto']} ticksCount={4}
                           padding={{top: 15, bottom: 15}}/>
                    <Tooltip content={(t) => <ToolTipContent t={t}/>}/>
                    <ReferenceLine y={threshold || 125} label="Threshold" stroke="red" strokeDasharray="5 2"/>
                    <Line type="monotone" dataKey="point" stroke="#8884d8" activeDot={{r: 8}}/>
                </LineChart>
            </ResponsiveContainer>
            <div className={'legend'}>
                <Legend meta={meta}/>
            </div>
        </div>
    );
}

export default Chart;