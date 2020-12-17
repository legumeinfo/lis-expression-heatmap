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
	    expressionOptions: {
		scale: 'log'  // log or linear
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

        // don't show heatmap for single features (report pages)
        if (!Array.isArray(featureId)) return;

	// fetch data for expression heatmap
        for (var index = 0; index<featureId.length; index++) {
	    queryExpressionData(featureId[index], serviceUrl)
	        .then(response => {
                    // samples should be the same for each feature
                    const sampleData = getExpressionSamples(response);
                    this.setState((state) => ({
                        expressionSamples: sampleData
                    }));
                    // concat this feature
                    const featureData = getExpressionFeatures(response);
                    this.setState((state) => ({
                        expressionFeatures: this.state.expressionFeatures.concat(featureData)
                    }));
                    // get the data for this feature
		    const chartData = getExpressionHeatmapData(
		        response,
		        this.state.expressionOptions
		    );
                    // concat the data
                    this.setState((state) => ({
	                expressionHeatmapData: this.state.expressionHeatmapData.concat(chartData)
	            }));
	        })
	        .catch(() =>
		       this.setState({
                           error: 'No Expression Data Found!'
                       })
                      );
        }
    }
    
    componentWillUnmount() {
    }

    render() {
	// if (this.state.error) {
	//     return <div className="rootContainer error">{this.state.error}</div>;
	// }

        if (!Array.isArray(this.props.entity.value)) {
            return <div></div>;
        }

	return (
	    <div className="rootContainer">
	        {this.state.expressionHeatmapData.length>0 ? (
	                <>
	        	<ExpressionHeatmap
	            chartData={this.state.expressionHeatmapData}
                    samples={this.state.expressionSamples}
                    features={this.state.expressionFeatures}
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
