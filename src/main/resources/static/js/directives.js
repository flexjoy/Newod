'use strict';

app.directive('newodSearchForm', function() {
	return {
		restrict: 'E',
		replace: true,
		templateUrl: 'partials/searchForm.html'
	};
});

app.directive('newodActionButtons', function() {
	return {
		restrict: 'E',
		replace: true,
		templateUrl: 'partials/actionButtons.html',
		link: function (scope, element, attrs) {
			scope.entity = scope.$eval(attrs.entity);
		}
	};
});
