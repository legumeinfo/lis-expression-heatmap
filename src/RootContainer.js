import React from 'react';
import Loader from './common/loader';
import {
    chart as ExpressionHeatmap,
    queryData as queryExpressionData,
    getChartData as getExpressionHeatmapData,
    getSampleData as getExpressionSamples,
    getFeatureData as getExpressionFeatures
} from './expressionHeatmap';

class RootContainer extends React.Component {
    constructor(props) {
	super(props);
	this.state = {
	    expressionHeatmapData: [],
            expressionSamples: [],
            expressionFeatures: [],
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

	// fetch data for expression heatmap
	queryExpressionData(featureId, serviceUrl)
	    .then(response => {
                // samples should be the same for each feature
                const sampleData = getExpressionSamples(response);
                this.setState((state) => ({
                    expressionSamples: sampleData
                }));
                // concat this feature
                const featureData = getExpressionFeatures(response);
                this.setState((state) => ({
                    expressionFeatures: featureData
                }));
                // get the data for this feature
		const chartData = getExpressionHeatmapData(response);
                this.setState((state) => ({
	            expressionHeatmapData: chartData
	        }));
	    })
	    .catch(() =>
		   this.setState({
                       error: 'Error querying expression data.'
                   })
                  );
    }
    
    componentWillUnmount() {
    }

    render() {
	if (this.state.error) {
	    return <div className="rootContainer error">{this.state.error}</div>;
	}

	return (
	    <div className="rootContainer">
	        {this.state.expressionHeatmapData.length>0 ? (
	                <>
	        	<ExpressionHeatmap
	            chartData={this.state.expressionHeatmapData}
                    samples={this.state.expressionSamples}
                    features={this.state.expressionFeatures}
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
