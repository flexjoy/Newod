'use strict';

app.factory('City', function($resource) {

	return	$resource('api/cities/:id',	{ id: '@id'	},
		{
			update: { method: 'PUT'	},
			getAll:	{ method: 'GET', isArray: true, url: 'api/cities/all'}
		}
	);
});
