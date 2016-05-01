'use strict';

app.directive('newodSearchForm', function() {
	return {
		restrict: 'E',
		replace: true,
		templateUrl: 'partials/searchForm.html'
	};
});

app.directive('newodPagination', function() {
	return {
		restrict: 'E',
		templateUrl: 'partials/pagination.html'
	};
});
