import React from 'react';
import Chart from 'chart.js';

class ExpressionHeatmap extends React.Component {
    componentDidMount() {
	const { chartData, dataOptions } = this.props;
	if (!chartData) return;
	this.chart = new Chart(this.graph, {
	    type: 'horizontalBar',
	    data: {
		labels: chartData.sampleNames,
		datasets: [
		    {
			label: chartData.features[0],
			data: chartData.values,
			backgroundColor: '#373',
			borderWidth: 2
		    }
		]
	    },
	    options: {
		title: {
		    text: 'Expression by Sample',
		    display: true,
		    fontSize: 18,
		    position: 'top',
		    fontStyle: 'bold',
		    fontColor: '#000'
		},
		// tooltips: {
		//     callbacks: {
		// 	label(tooltipItem) {
		// 	    return chartData.hoverTexts[tooltipItem.index];
		// 	}
		//     },
		//     backgroundColor: '#ffffff',
		//     bodyFontColor: '#000000',
		//     titleFontColor: '#000000',
		//     titleFontSize: 16,
		//     bodyFontSize: 14,
		//     borderColor: '#dadada',
		//     borderWidth: 1
		// },
		scales: {
		    yAxes: [
			{
			    scaleLabel: {
				display: true,
				labelString: 'Sample Name',
				fontSize: 16,
				fontStyle: 'italic',
				fontColor: '#000'
			    }
			}
		    ],
		    xAxes: [
			{
			    scaleLabel: {
				display: true,
				labelString: 'Expression (TPM)',
				fontSize: 16,
				fontStyle: 'italic',
				fontColor: '#000'
			    }
			}
		    ]
		},
		maintainAspectRatio: true,
		responsive: true
	    }
	});
    }

    componentDidUpdate() {
	const { chartData, dataOptions } = this.props;
	if (!chartData) return;
	this.chart.data.labels = chartData.sampleNames;
	this.chart.data.datasets[0].data =
	    dataOptions.val === chartData.values;
	this.chart.data.datasets[0].backgroundColor = '#bbb';
	this.chart.update();
    }

    render() {
	return (
	    <canvas
		height={
		    (this.props.chartData && this.props.chartData.sampleNames.length) > 30
			? '260px'
			: ''
		}
		className="graph"
		ref={r => {
		    this.graph = r;
		}}
	    />
	);
    }
}

export default ExpressionHeatmap;
