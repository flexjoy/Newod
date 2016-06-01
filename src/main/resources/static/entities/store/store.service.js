'use strict';

app.factory('Store', function($resource) {

	return	$resource('api/stores/:id',	{ id: '@id'	},
		{
			update: { method: 'PUT'	},
			getAll:	{ method: 'GET', isArray: true, url: 'api/stores/all'}
		}
	);
});
