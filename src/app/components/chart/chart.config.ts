export const chartConfig = () => {
    return {
        bindto: '#chart',
        data: {
            x: 'x',
            columns: []
        },
        axis: {
            x: {
                type: 'timeseries',
                tick: {
                    format: '%d-%m-%Y'
                }
            }
        }
    }
}
