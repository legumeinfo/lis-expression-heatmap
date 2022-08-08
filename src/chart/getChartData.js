/**
 * Return an array of arrays: [features[samples]]
 * Assume results are sorted by feature,sample.
 * result:
 *         {
 *             "sample": {
 *                 "num": 1,
 *                 "objectId": 64000005,
 *                 "class": "ExpressionSample",
 *                 "name": "Leaf Young"
 *             },
 *             "value": 2195.53,
 *             "feature": {
 *                 "secondaryIdentifier": "Phvul.001G039200",
 *                 "objectId": 58559050,
 *                 "class": "Gene"
 *             }
 *         },
 */
function getChartData(results) {
    const chartData = [];
    var rowData = [];
    var oldFeatureName = "";
    results.forEach(result => {
        const sampleName = result.sample.name;
        const value = Number(result.value);
        const featureName = result.feature.secondaryIdentifier;
        if (featureName!=oldFeatureName) {
            if (oldFeatureName!="") {
                chartData.push(rowData);
                rowData = [];
            }
            oldFeatureName = featureName;
        }            
        rowData.push(value);
    });
    // last one
    chartData.push(rowData);
    return chartData;
}

export default getChartData;
