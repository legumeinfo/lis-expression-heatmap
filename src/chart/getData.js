/**
 * Return a chartXpress data object from queryExpressionData results.
 */
export default function getData(response) {
    const data = [];
    const smps = [];
    const vars = [];
    var featureData = [];
    response.forEach(result => {
        const sample = result.sample;
        const value = result.value;
        const feature = result.feature;
        if (!smps.includes(sample.name)) {
            smps.push(sample.name);
        }
        if (vars.includes(feature.name)) {
            featureData.push(value);
        } else {
            vars.push(feature.name);
            if (featureData.length>0) {
                data.push(featureData);
            }
            featureData = [ value ];
        }
    });
    // last feature
    data.push(featureData);

    const y = {
        "data": data,
        "smps": smps,
        "vars": vars
    }

    return { "y": y };
}
