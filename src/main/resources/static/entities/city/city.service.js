'use strict';

app.factory('City', function($resource) {

	var resourceUrl = 'api/cities/:id';
	return	$resource(
		resourceUrl,
		{
			id: '@_id'
		},
		{
			query: 	{
				method: 'GET',
				isArray: false
			},
			update: {
				method: 'PUT'
			}
		}
	);
});
