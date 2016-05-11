'use strict';

app.factory('Store', function($resource) {

	return	$resource('api/stores/:id',	{ id: '@id'	},
		{
			update: { method: 'PUT'	}
		}
	);
});
