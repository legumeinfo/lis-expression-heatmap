/**
 * Query the expression data for the given feature IDs.
 */
export default function queryData(featureIds, serviceUrl, imjsClient = imjs) {
    return new Promise((resolve, reject) => {
	// eslint-disable-next-line
	const service = new imjsClient.Service({ root: serviceUrl });
	service
	    .records(pathQuery({ featureIds }))
	    .then(data => {
		if (data && data.length) {
                    resolve(data);
		} else {
                    reject('No data found!');
                }
	    })
	    .catch(reject);
    });
}

// The imjs path query.
const pathQuery = ({ featureIds }) => ({
    from: 'ExpressionValue',
    select: [
        'value',
	'feature.name',
        'sample.num',
	'sample.name',
        'sample.description',
        'sample.genotype',
        'sample.tissue',
        'sample.treatment',
        'sample.replicateGroup',
	'sample.source.primaryIdentifier'
    ],
    orderBy: [
        { path: 'sample.source.primaryIdentifier', direction: 'ASC' },
        { path: 'feature.name', direction: 'ASC' },
	{ path: 'sample.num', direction: 'ASC' }
    ],
    where: [
	{
	    path: 'feature.id',
	    op: 'ONE OF',
	    values: featureIds
	}
    ]
});

