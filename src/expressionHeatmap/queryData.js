const featureToExpressionQuery = ({ featureId }) => ({
    from: 'ExpressionValue',
    select: [
        'value',
        'feature.id',
	'feature.secondaryIdentifier',
	'sample.name',
        'sample.num'
    ],
    orderBy: [
	{
	    path: 'sample.num',
	    direction: 'ASC'
	},
        {
            path: 'feature.secondaryIdentifier',
            direction: 'ASC'
        }
    ],
    where: [
	{
	    path: 'feature.id',
	    op: 'ONE OF',
	    values: featureId
	}
    ]
});

// queryExpressionData in RootContainer.js
function queryData(featureId, serviceUrl, imjsClient = imjs) {
    return new Promise((resolve, reject) => {
	// eslint-disable-next-line
	const service = new imjsClient.Service({ root: serviceUrl });
	service
	    .records(featureToExpressionQuery({ featureId }))
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

export default queryData;
