export default class APIConnector {

    constructor() {
        this.uri = `https://www.alphavantage.co`;
    }

    async getDataPoints(ticks = 5, symbol = `MSFT`) {
        this.ticks = ticks;

        try {
            let response = await fetch(`${this.uri}/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=${ticks}min&apikey=demo`);
            this.response = await response.json();
            return this.processResponse(this.response);
        } catch (e) {
            throw e
        }
    }

    processResponse(res) {
        // turning the response object to a sorted array
        let data = res[`Time Series (${this.ticks}min)`];
        let dataArray = [];
        for (let point in data) {
            if (data.hasOwnProperty(point)) {
                dataArray.push({label: point, ...data[point], point: Number(data[point][`1. open`])});
            }
        }

        let sortedArray = dataArray.sort(function (a, b) {
            return (a.label[0] - b.label[1]);
        });

        return {
            data: sortedArray,
            meta: res[`Meta Data`]
        }
    }
}