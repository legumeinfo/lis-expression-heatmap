/**
 * Return unique sample names from path query results.
 */
function getSamples(results) {
    const samples = [];
    results.forEach(result => {
        const name = result.sample.name;
        if (!samples.includes(name)) {
            samples.push(name);
        }
    });
    return samples;
}
export default getSamples;
