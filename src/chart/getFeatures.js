/**
 * Return unique featureIds.
 */
function getFeatures(results) {
    const features = [];
    results.forEach(result => {
        const featureId = result.feature.secondaryIdentifier;
        if (!features.includes(featureId)) {
            features.push(featureId);
        }
    });
    return features;
}
export default getFeatures;