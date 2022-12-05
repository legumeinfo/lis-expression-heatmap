/**
 * Query expression for the given source and feature IDs.
 */
export default function queryExpressionData(serviceUrl, source, featureIds, imjsClient = imjs) {
    return new Promise((resolve, reject) => {
	// eslint-disable-next-line
	const service = new imjsClient.Service({ root: serviceUrl });
	service
	    .records(pathQuery(source, featureIds))
	    .then(data => {
		if (data && data.length) {
                    resolve(data);
		} else {
                    reject('No expression data found!');
                }
	    })
	    .catch(reject);
    });
}

// ExpressionValue.feature.name
// ExpressionValue.sample.name
// ExpressionValue.value
const pathQuery = (source, featureIds) => ({
    from: 'ExpressionValue',
    select: [
        'feature.name',
	'sample.name',
        'value'
    ],
    orderBy: [
        { path: 'feature.name', direction: 'ASC' },
        { path: 'sample.name', direction: 'ASC' }
    ],
    where: [
	{
	    path: 'feature.id',
	    op: 'ONE OF',
	    values: featureIds
	}
    ]
});
