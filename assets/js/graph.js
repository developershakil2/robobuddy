const a = 82;
const b = 60;
const c = 46;




google.charts.load('upcoming', {
    'packages': ['vegachart']
}).then(drawChart);

function drawChart() {
    const dataTable = new google.visualization.DataTable();
    dataTable.addColumn({
        type: 'string',
        'id': 'category'
    });
    dataTable.addColumn({
        type: 'number',
        'id': 'amount'
    });

    dataTable.addRows([
        ['A', a],
        ['B', b],
        ['C', c],

    ]);

    const options = {
        "vega": {
            "$schema": "https://vega.github.io/schema/vega/v4.json",
            "width": 300,
            "height": 200,
            "padding": 2,


            'data': [{
                'name': 'table',
                'source': 'datatable'
            }],

            "signals": [{
                "name": "tooltip",
                "value": {},
                "on": [{
                    "events": "rect:mouseover",
                    "update": "datum"
                }, {
                    "events": "rect:mouseout",
                    "update": "{}"
                }]
            }],

            "scales": [{
                "name": "xscale",
                "type": "band",
                "domain": {
                    "data": "table",
                    "field": "category"
                },
                "range": "width",
                "padding": 0.05,
                "round": true
            }, {
                "name": "yscale",
                "domain": {
                    "data": "table",
                    "field": "amount"
                },
                "nice": true,
                "range": "height"
            }],

            "axes": [{
                "orient": "bottom",
                "scale": "xscale"
            }, {
                "orient": "left",
                "scale": "yscale"
            }],

            "marks": [{
                "type": "rect",
                "from": {
                    "data": "table"
                },
                "encode": {
                    "enter": {
                        "x": {
                            "scale": "xscale",
                            "field": "category"
                        },
                        "width": {
                            "scale": "xscale",
                            "band": 1
                        },
                        "y": {
                            "scale": "yscale",
                            "field": "amount"
                        },
                        "y2": {
                            "scale": "yscale",
                            "value": 0
                        }
                    },
                    "update": {
                        "fill": {
                            "value": "steelblue"
                        },

                    },
                    "hover": {
                        "fill": {
                            "value": "#ED7D31"
                        }
                    }
                }
            }, {
                "type": "text",
                "encode": {
                    "enter": {
                        "align": {
                            "value": "center"
                        },
                        "baseline": {
                            "value": "bottom"
                        },
                        "fill": {
                            "value": "#333"
                        }
                    },
                    "update": {
                        "x": {
                            "scale": "xscale",
                            "signal": "tooltip.category",
                            "band": 0.5
                        },
                        "y": {
                            "scale": "yscale",
                            "signal": "tooltip.amount",
                            "offset": -2
                        },
                        "text": {
                            "signal": "tooltip.amount"
                        },
                        "fillOpacity": [{
                            "test": "datum === tooltip",
                            "value": 0
                        }, {
                            "value": 1
                        }]
                    }
                }
            }]
        }
    };

    const chart = new google.visualization.VegaChart(document.getElementById('chart-div'));
    chart.draw(dataTable, options);
}