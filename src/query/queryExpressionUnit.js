/**
 * Query the unit for one value of for a given source.
 */
export default function queryExpressionUnit(serviceUrl, source, imjsClient = imjs) {
    return new Promise((resolve, reject) => {
	// eslint-disable-next-line
	const service = new imjsClient.Service({ root: serviceUrl });
	service
	    .records(pathQuery(source))
	    .then(data => {
		if (data && data.length) {
                    resolve(data);
		} else {
                    reject('No expression sample descriptions found!');
                }
	    })
	    .catch(reject);
    });
}

// ExpressionValue.unit
const pathQuery = (source) => ({
    from: 'ExpressionValue',
    select: [
	'unit'
    ],
    where: [
        {
            path: 'sample.source.id',
            op: '=',
            value: source.objectId
        }
    ]
});
