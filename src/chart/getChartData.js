/**
 * Return an array of heatmap data for the desired source.
 */
export default function getChartData(results, desiredSource) {
    const chartData = [];
    var rowData = [];
    var currentFeature = "";
    results.forEach(result => {
        const value = Number(result.value);
        const num = result.sample.num;
        const sample = result.sample.name;
        const sourceName = result.sample.source.primaryIdentifier;
        const feature = result.feature.name;
        if (sourceName == desiredSource.name) {
            if (feature != currentFeature) {
                if (currentFeature != "") {
                    chartData.push(rowData); // previous feature row
                    rowData = []; // initialize current feature row
                }
                currentFeature = feature;
            }
            rowData.push(value);
        }            
    });
    // push last row
    chartData.push(rowData);
    return chartData;
}
