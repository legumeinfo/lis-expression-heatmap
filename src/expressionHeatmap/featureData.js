// getExpressionFeatures in RootContainer.js
// return unique featureIds
function getFeatureData(results) {
    const featureData = [];

    results.forEach(result => {
        const featureId = result.feature.secondaryIdentifier;
        if (!featureData.includes(featureId)) {
            featureData.push(featureId);
        }
    });

    return featureData;
}

export default getFeatureData;
