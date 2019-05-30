import React from "react";

export function ToolTipContent({t}) {
    if (t.payload[0] && t.payload[0].payload) {
        let content = t.payload[0] && t.payload[0].payload;

        let keys = [{id: `1. open`, label: 'Open: '},
            {id: `2. high`, label: 'High: '},
            {id: `3. low`, label: 'Low: '},
            {id: `4. close`, label: 'Close: '},
            {id: `5. volume`, label: 'Volume: '}
        ];

        return (
            <div className={'tooltip-container'}>
                <div className={'item'}>
                    <div>
                        <div>{content.label}</div>
                    </div>
                </div>
                {
                    keys.map(key => (
                        <div key={key.id} className={'item'}>
                            <div>{key.label}</div>
                            <div>{content[key.id]}</div>
                        </div>
                    ))
                }
            </div>
        )
    }
    return null;
}

export function Legend({meta}) {
    let keys = [{id: `1. Information`, label: 'Information: '},
        {id: `2. Symbol`, label: 'Symbol: '},
        {id: `3. Last Refreshed`, label: 'Last Refreshed: '},
        {id: `4. Interval`, label: 'Interval: '},
        {id: `5. Output Size`, label: 'Output Size: '},
        {id: `6. Time Zone`, label: 'Time Zone: '}
    ];

    return (
        <div className={'tooltip-container'}>
            <div className={'item'}>
                <div>
                    <div>{meta.label}</div>
                </div>
            </div>
            {
                keys.map(key => (
                    <div key={key.id} className={'item'}>
                        <div>{key.label}</div>
                        <div>{meta[key.id]}</div>
                    </div>
                ))
            }
        </div>
    )
}

export const ErrorMessage = ({message}) => (
    <div className={'error-message'}>
        <div>Error Occurred:</div>
        <div>{message}</div>
    </div>
);