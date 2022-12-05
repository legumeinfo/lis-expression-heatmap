// [
//     {
//         "primaryIdentifier": "G19833.gnm1.ann1.expr.Negro_jamapa.ORourke_Iniguez_2014",
//         "synopsis": "Bean Expression Atlas for common bean cv. Negro jamapa mapped to the G19833 version 1 genome annotation.",
//         "id": 42000003,
//         "unit": "TPM",
//         "geneCount": 60,
//         "sampleCount": 15
//     },
//     {
//         etc.
//     }
// ]

/**
 * Query all expression sources.
 */
export default function querySources(serviceUrl, imjsClient = imjs) {
    return new Promise((resolve, reject) => {
	// eslint-disable-next-line
	const service = new imjsClient.Service({ root: serviceUrl });
	service
	    .records(pathQuery())
	    .then(data => {
		if (data && data.length) {
                    resolve(data);
		} else {
                    reject('No expression source data found!');
                }
	    })
	    .catch(reject);
    });
}

// ExpressionSource.id
// ExpressionSource.primaryIdentifier
// ExpressionSource.synopsis
// ExpressionSource.description
// ExpressionSource.bioProject
// ExpressionSource.sra
const pathQuery = () => ({
    from: 'ExpressionSource',
    select: [
	'primaryIdentifier',
        'synopsis',
        'description',
        'bioProject',
        'sra'
    ],
    orderBy: [
        { path: 'primaryIdentifier', direction: 'ASC' }
    ]
});
