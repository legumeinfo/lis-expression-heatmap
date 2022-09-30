/**
 * Return unique feature names.
 */
export default function getFeatures(results) {
    const features = [];
    results.forEach(result => {
        const name = result.feature.name;
        if (!features.includes(name)) {
            features.push(name);
        }
    });
    return features;
}
