/**
 * Return an array of source names.
 */
// result:
// {
//     "sample": {
//         "source": {
//             "primaryIdentifier": "CDCFrontier.gnm3.ann1.expr.CDC_Consul.Perilla-Henao_2018"
//         },
//         "name": "LR-112A",
//         "num": 1
//     },
//     "value": 0,
//     "feature": {
//         "name": "Ca1g261100"
//     }
// }
export default function getSources(results) {
    const sources = [];
    var currentSource = "";
    results.forEach(result => {
        const source = result.sample.source.primaryIdentifier;
        if (source != currentSource) {
            sources.push(source);
            currentSource = source;
        }
    });
    return sources;
}
