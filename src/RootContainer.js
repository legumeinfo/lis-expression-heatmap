import React from 'react';
import Loader from './common/loader';
import {
    chart as ExpressionHeatmap,
    queryData as queryExpressionData,
    getChartData as getExpressionHeatmapData
} from './expressionHeatmap';

class RootContainer extends React.Component {
    constructor(props) {
	super(props);
	this.state = {
	    expressionHeatmapData: null,
	    expressionOptions: {
		scale: 'linear'  // log or linear
	    },
	    error: null
	};
    }

    componentDidMount() {
	// when testing via jest, don't do all the calcs
	if (this.props.testing) return;

	if (!this.props.entity || !this.props.serviceUrl)
	    throw new Error('No `entity` or `serviceUrl` passed as prop');

	const {
	    entity: { value: featureId },
	    serviceUrl
	} = this.props;

        // don't show heatmap on lists
        if (!Array.isArray(featureId)) return;

	// fetch data for expression heatmap
	queryExpressionData(featureId[0], serviceUrl)
	    .then(res => {
		const results = res;
		const chartData = getExpressionHeatmapData(
		    results,
		    this.state.expressionOptions
		);
		this.setState({
		    expressionHeatmapData: chartData
		});
	    })
	    .catch(() =>
		   this.setState({ error: 'No Expression Data Found!' })
	          );
    }

    render() {
	if (this.state.error) {
	    return <div className="rootContainer error">{this.state.error}</div>;
	}

        if (!Array.isArray(this.props.entity.value)) {
            return <div></div>;
        }

	return (
	    <div className="rootContainer">
		{this.state.expressionHeatmapData ? (
		    <>
			<ExpressionHeatmap
			    chartData={this.state.expressionHeatmapData}
		            dataOptions={this.state.expressionOptions}
			/>
		    </>
		) : (
		    <Loader />
		)}
	    </div>
	);
    }
}

export default RootContainer;
