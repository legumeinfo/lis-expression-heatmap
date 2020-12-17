import React from 'react';
import { Chart, Tooltip, CategoryScale, LinearScale, Title } from 'chart.js';
import { color } from 'chart.js/helpers';
import { Matrix, MatrixController } from 'chartjs-chart-matrix';
Chart.register(Tooltip, CategoryScale, LinearScale, Title, Matrix, MatrixController);

class ExpressionHeatmap extends React.Component {
    constructor(props) {
	super(props);
    }

    componentDidMount() {
        const { chartData, samples, features, dataOptions } = this.props;
        this.chart = new Chart(this.graph, {
            type: 'matrix',
	    data: {
		datasets: [{
		    label: 'My Matrix',
		    data: chartData,
		    backgroundColor: function(context) {
		        const value = context.dataset.data[context.dataIndex].v;
                        let alpha = Math.max(value/1000, 1.0);
                        if (dataOptions.scale != 'linear') {
                            alpha = alpha = Math.log10(value) / 4;
                        }
	                return color('green').alpha(alpha).rgbString();
		    },
		    width: function(context) {
		        const a = context.chart.chartArea;
		        if (!a) {
		            return 0;
		        }
		        return (a.right - a.left) / samples.length;
		    },
		    height: function(context) {
		        const a = context.chart.chartArea;
		        if (!a) {
		            return 0;
		        }
		        return (a.bottom - a.top) / features.length;
		    }
		}]
	    },
	    options: {
		tooltips: {
		    callbacks: {
			title() {
                            return '';
			},
			label(context) {
			    const v = context.dataset.data[context.dataIndex];
			    return [v.y, v.x, v.v + ' TPM'];
			}
		    }
                },
		scales: {
		    x: {
			type: 'category',
                        display: true,
                        scaleLabel: {
                            display: false
                        },
			labels: samples,
                        offset: true,
			ticks: {
			    display: true
			},
			gridLines: {
			    display: false
			}
		    },
		    y: {
			type: 'category',
			labels: features,
			offset: true,
			ticks: {
			    display: true
			},
			gridLines: {
			    display: false
			}
		    }
		}
	    }
        });
        
    }

    componentDidUpdate() {
        const { chartData, samples, features, dataOptions } = this.props;
	if (chartData.length == 0) return;
        this.chart.data.datasets[0].data = chartData;
        this.chart.options.scales.x.labels = samples;
        this.chart.options.scales.y.labels = features;
	this.chart.data.datasets[0].height = function(context) {
	    const a = context.chart.chartArea;
	    if (!a) {
		return 0;
	    }
	    return (a.bottom - a.top) / features.length;
	}
	this.chart.update();
    }

    render() {
	return (
	    <canvas
	    // height={
	    //     (this.props.features.length > 30)
	    // 	? '260px'
	    // 	: ''
	    // }
	    className="graph"
	    ref={r => {
		this.graph = r;
	    }}
	        />
	)
    }

}

export default ExpressionHeatmap;
