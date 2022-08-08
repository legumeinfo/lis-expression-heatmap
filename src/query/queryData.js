const pathQuery = ({ featureIds }) => ({
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
            path: 'feature.secondaryIdentifier',
            direction: 'ASC'
        },
	{
	    path: 'sample.num',
	    direction: 'ASC'
	}
    ],
    where: [
	{
	    path: 'feature.id',
	    op: 'ONE OF',
	    values: featureIds
	}
    ]
});

function queryData(featureIds, serviceUrl, imjsClient = imjs) {
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

export default queryData;
