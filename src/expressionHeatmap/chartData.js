function getChartData(results, dataOptions) {
    const { scale } = dataOptions;

    // sort according to sample number
    results.sort((r1, r2) => {
    	let valA, valB;
        valA = r1.sample.num;
        valB = r2.sample.num;
        return valA < valB ? -1 : valA > valB ? 1 : 0;
    });

    const chartData = {
	values: [],
        sampleNames: [],
        features: []
    };

    results.forEach(result => {
	// scale value acc to dataOptions - log / linear
	const scaleVal = n => (scale === 'log' ? Math.log2(n) : n);
	chartData.values.push(scaleVal(Number(result.value)));
	chartData.sampleNames.push(result.sample.name);
        chartData.features.push(result.feature);
    });

    return chartData;
}

export default getChartData;
