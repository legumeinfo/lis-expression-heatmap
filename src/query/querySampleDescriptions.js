/**
 * Query sample descriptions for a given source.
 */
export default function querySampleDescriptions(serviceUrl, source, imjsClient = imjs) {
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

// ExpressionSample.name
// ExpressionSample.description
const pathQuery = (source) => ({
    from: 'ExpressionSample',
    select: [
	'name',
        'description'
    ],
    orderBy: [
        { path: 'name', direction: 'ASC' }
    ],
    where: [
        {
            path: 'source.id',
            op: '=',
            value: source.objectId
        }
    ]
});
