'use strict';

app.factory('Division', function($resource) {

	var resourceUrl = 'api/divisions/:id';
	return	$resource(
		resourceUrl,
		{
			id: '@_id'
		},
		{
			query: 	{
				method: 'GET', isArray: false
			},
			update: {
				method: 'PUT'
			}
		}
	);
});
