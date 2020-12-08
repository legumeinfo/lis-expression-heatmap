const featureToExpressionQuery = ({ featureId }) => ({
    from: 'ExpressionValue',
    select: [
        'value',
        'feature.id',
	'feature.secondaryIdentifier',
	'feature.symbol',
	'sample.name',
        'sample.num',
	'sample.dataSets.name'
    ],
    orderBy: [
	{
	    path: 'sample.num',
	    direction: 'ASC'
	}
    ],
    where: [
	{
	    path: 'feature.id',
	    op: '=',
	    value: featureId
	}
    ]
});

// eslint-disable-next-line
function queryData(featureId, serviceUrl, imjsClient = imjs) {
    return new Promise((resolve, reject) => {
	// eslint-disable-next-line
	const service = new imjsClient.Service({ root: serviceUrl });
	service
	    .records(featureToExpressionQuery({ featureId }))
	    .then(data => {
                // rearrange into expected format
                data = rearrange(data);
		if (data && data.length) {
                    resolve(data[0]);
		} else {
                    reject('No data found!');
                }
	    })
	    .catch(reject);
    });
}

export default queryData;

// rearrange the data from an ExpressionValue query into the form expected by this tool
function rearrange(data) {
    var results = [];
    for (var i=0; i<data.length; i++) {
        results.push(
            {
                "feature": data[i].feature.secondaryIdentifier,
                "value": data[i].value,
                "dataSets": data[i].sample.dataSets,
                "sample": {
                    "name": data[i].sample.name,
                    "class": data[i].sample.class,
                    "objectId": data[i].sample.objectId,
                    "num": data[i].sample.num
                },
                "class": "expressionValue",
                "objectId": data[i].objectId
            }
        );
    }
    return([results]);
}
