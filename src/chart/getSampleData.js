/**
 * Return the sample data for the desired source as a JSON object of arrays.
 */
export default function getSampleData(results, desiredSource) {
    const nums = [];
    const names = [];
    const genotypes = [];
    const tissues = [];
    const treatments = [];
    results.forEach(result => {
        const sourceName = result.sample.source.primaryIdentifier;
        const num = result.sample.num;
        if (sourceName == desiredSource.name && !nums.includes(num)) {
            nums.push(num);
            names.push(result.sample.name);
            genotypes.push(result.sample.genotype);
            tissues.push(result.sample.tissue);
            treatments.push(result.sample.treatment);
        }
    });
    return ({
        "nums": nums,
        "names": names,
        "genotypes": genotypes,
        "tissues": tissues,
        "treatments": treatments
    });
}
