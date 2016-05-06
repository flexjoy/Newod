'use strict';

app.directive('newodTableActionButtons', function() {
	return {
		restrict: 'E',
		replace: true,
		templateUrl: 'partials/directive/tableActionButtons.html'
	};
});
