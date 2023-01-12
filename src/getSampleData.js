/**
 * Return the sample data for the desired source as a JSON object of arrays.
 */
export default function getSampleData(results, desiredSource) {
    const sampleData = [];
    const names = [];
    const genotypes = [];
    const tissues = [];
    const treatments = [];
    results.forEach(result => {
        const sourceName = result.sample.source.primaryIdentifier;
        const name = result.sample.name;
        if (sourceName == desiredSource.name && !names.includes(name)) {
            names.push(name);
            const sample = {
                name: name,
                genotype: result.sample.genotype,
                tissue: result.sample.tissue,
                treatment: result.sample.treatment
            }
            sampleData.push(sample);
        }
    });
    return sampleData;
}
