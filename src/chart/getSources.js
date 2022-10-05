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
    // {
    //     "objectId": 97952209,
    //     "sample": {
    //         "genotype": "CDC_Consul",
    //         "objectId": 7000013,
    //         "replicateGroup": "MmRse19-root",
    //         "class": "ExpressionSample",
    //         "source": {
    //             "objectId": 7000002,
    //             "class": "ExpressionSource",
    //             "primaryIdentifier": "CDCFrontier.gnm3.ann1.expr.CDC_Consul.Perilla-Henao_2018",
    //             "synopsis": "Study of Nitrogen effects on gene expression from chickpea genotype CDC_Consul mapped to the CDCFrontier.gnm3.ann1 genome annotation."
    //         },
    //         "tissue": "root",
    //         "description": "M.mediRse19",
    //         "name": "LR-112A",
    //         "num": 1,
    //         "treatment": "Mesorhizobium mediterraneum Rse19"
    //     },
    //     "value": 0,
    //     "class": "ExpressionValue",
    //     "feature": {
    //         "objectId": 5726049,
    //         "class": "Gene",
    //         "name": "Ca1g261100"
    //     }
    // }
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
