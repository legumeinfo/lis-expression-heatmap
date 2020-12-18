// getExpressionSamples in RootContainer.js
// return unique sample names
function getSampleData(results) {
    const sampleData = [];

    results.forEach(result => {
        const sampleName = result.sample.name;
        if (!sampleData.includes(sampleName)) {
            sampleData.push(sampleName);
        }
    });

    return sampleData;
}

export default getSampleData;
