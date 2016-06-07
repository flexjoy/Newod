'use strict';

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// newod-table-header-buttons directiv                                                                                //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * show create and filter buttons for entity table
 */
app.directive('newodTableActionButtons', function() {
	return {
		restrict: 'E',
		replace: true,
		templateUrl: 'partials/directive/tableActionButtons.html'
	};
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// newod-table-action-menu directive                                                                                  //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * show action buttons for entity table
 * must set 'entity' attribute
 */
app.directive('newodTableActionMenu', function() {
	return {
		restrict: 'E',
		replace: true,
		templateUrl: 'partials/directive/tableActionMenu.html',
		link: function (scope, element, attrs) {
			scope.entity = scope.$eval(attrs.entity);
		}
	};
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// newod-display-enabled directive                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * show enabled properties for entity
 * must set 'entity' attribute
 */
app.directive('newodDisplayEnabled', function() {
	return {
		restrict: 'E',
		replace: true,
		templateUrl: 'partials/directive/displayEnabled.html',
		link: function (scope, element, attrs) {
			scope.entity = scope.$eval(attrs.entity);
		}
	};
});
