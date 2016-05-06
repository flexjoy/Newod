'use strict';

app.factory('Division', function($resource) {

	return	$resource('api/divisions/:id', { id: '@id' },
		{
			update: { method: 'PUT' }
		}
	);
});
