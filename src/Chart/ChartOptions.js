import React from "react";

function ChartOptions({setThreshold, setDataPoints, threshold, dataPoints}) {
    return (
        <div className="chart-options-container">
            <div className={'option-item'}>
                <div>Threshold:</div>
                <input type="number" value={threshold} onChange={event => setThreshold(event.target.value)}/>
            </div>
            <div className={'option-item'}>
                <div>Data points:</div>
                <input type="number" value={dataPoints} onChange={event => setDataPoints(event.target.value)}/>
            </div>
        </div>
    );
}

export default ChartOptions;
