'use strict';

/**
 * newod-table-action-buttons directive
 * using to show action buttons for entity table
 */
app.directive('newodTableActionButtons', function() {
	return {
		restrict: 'E',
		replace: true,
		templateUrl: 'partials/directive/tableActionButtons.html'
	};
});
