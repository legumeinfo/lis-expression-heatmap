/**
 * Return an array of unique source names.
 */
export default function getSources(results) {
    const sources = [];
    results.forEach(result => {
        const source = result.sample.source.primaryIdentifier;
        if (!sources.includes(source)) {
            sources.push(source);
        }
    });
    return sources;
}
