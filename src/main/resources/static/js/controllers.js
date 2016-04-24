'use strict';

app.controller('NavBarController', function($scope, $location) {
	$scope.isActive = function (viewLocation) {
		return viewLocation === $location.path();
	};
});

app.controller('HomeController', function($scope) {});

app.controller('DivisionController', function ($scope, $http) {

	var vm = this;

	vm.goToPage = function (number) {
		var uri = 	'/divisions' +
					'?page=' + (number - 1) +
					'&sort=' + vm.sort.field + ',' + vm.sort.direction;
		$http.get('/api' + uri).success(function (data) {
			vm.divisions = data.content;
			vm.page = {
				size: 				data.size,
				number: 			data.number,
				totalElements: 		data.totalElements,
				numberOfElements: 	data.numberOfElements
			};
		});
	}

	vm.sortByField = function (fieldName) {
		if (fieldName == vm.sort.field) {
			vm.sort.direction = vm.sort.direction == 'asc' ? 'desc' : 'asc';
		} else {
			vm.sort.field = fieldName;
			vm.sort.direction = 'asc';
		}

		vm.sort.class = vm.sort.direction == 'asc' ? 'glyphicon-chevron-up' : 'glyphicon-chevron-down';

		vm.goToPage(vm.page.number + 1);
	}

	vm.sort = {
		field: 'name',
		direction: 'asc',
		class: 'glyphicon-chevron-up'
	};
	vm.goToPage(1);
});
