/**
 * Return an array of arrays: [features[samples]]
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
export default function getChartData(results) {
    const chartData = [];
    var rowData = [];
    var oldFeatureName = "";
    results.forEach(result => {
        const sampleName = result.sample.name;
        const value = Number(result.value);
        const featureName = result.feature.name;
        if (featureName!=oldFeatureName) {
            if (oldFeatureName!="") {
                chartData.push(rowData);
                rowData = [];
            }
            oldFeatureName = featureName;
        }            
        rowData.push(value);
    });
    // last one
    chartData.push(rowData);
    return chartData;
}
