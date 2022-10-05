/**
 * Return an array of source objects.
 * source: {
 *   name:
 *   synopsis;
 * }
 */
export default function getSources(results) {
    const sources = [];
    const names = [];
    var i = -1;
    // spin through the results, to accumulate distinct sources
    results.forEach(result => {
        const name = result.sample.source.primaryIdentifier;
        if (!names.includes(name)) {
            i++;
            names.push(name);
            sources.push({
                name: result.sample.source.primaryIdentifier,
                synopsis: result.sample.source.synopsis
            });
        }
    });

    return sources;
}
