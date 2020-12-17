// getExpressionHeatmapData in RootContainer.js
function getChartData(results, dataOptions) {
    const { scale } = dataOptions;

    // // sort according to sample number
    // results.sort((r1, r2) => {
    // 	let valA, valB;
    //     valA = r1.sample.num;
    //     valB = r2.sample.num;
    //     return valA < valB ? -1 : valA > valB ? 1 : 0;
    // });

    const chartData = [];

    results.forEach(result => {
	// scale value acc to dataOptions - log / linear
	// const scaleVal = n => (scale === 'log' ? Math.log2(n) : n);
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
