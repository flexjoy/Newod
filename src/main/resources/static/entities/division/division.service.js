'use strict';

app.factory('Division', function($resource) {

	return	$resource('api/divisions/:id', { id: '@id' },
		{
			update: { method: 'PUT' },
			getAll:	{ method: 'GET', isArray: true, url: 'api/divisions/all'}
		}
	);
});
