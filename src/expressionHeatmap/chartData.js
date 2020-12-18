// getExpressionHeatmapData in RootContainer.js
// return x, y, v records with x=sample, y=feature, v=value
function getChartData(results) {

    // // sort according to sample number
    // results.sort((r1, r2) => {
    // 	let valA, valB;
    //     valA = r1.sample.num;
    //     valB = r2.sample.num;
    //     return valA < valB ? -1 : valA > valB ? 1 : 0;
    // });

    const chartData = [];

    results.forEach(result => {
        const item = {
            "x": result.sample.name,
            "y": result.feature.secondaryIdentifier,
            "v": Number(result.value)
        }
        chartData.push(item);
    });

    return chartData;
}

export default getChartData;
