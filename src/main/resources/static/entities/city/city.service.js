'use strict';

app.factory('City', function($resource) {

	return	$resource('api/cities/:id',	{ id: '@id'	},
		{
			update: { method: 'PUT'	}
		}
	);
});
