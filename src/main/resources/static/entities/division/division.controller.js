'use strict';

app.controller('DivisionController', function ($scope, $state, $stateParams, Division, $location, AlertService) {

	var vm = this;
	vm.sizeArray = [10, 20, 30, 50];

	vm.reload = function () {
		$state.go('.',
			{
				page: vm.page.number,
				size: vm.page.size,
				sort: vm.sort.field + ',' + vm.sort.direction
			}
		);
	}

	vm.getData = function () {
		Division.query(
			{
				page: $stateParams.page - 1,
				size: $stateParams.size,
				sort: $stateParams.sort
			},
			onSuccess,
			onError
		);

		function onSuccess(data) {
			vm.divisions = data.content;
			vm.page = {
				size: 				data.size,
				number: 			$stateParams.page,
				totalElements: 		data.totalElements,
				numberOfElements: 	data.numberOfElements,
				firstIndex:			data.size * data.number + 1,
				lastIndex:			data.size * data.number + data.numberOfElements
			};
			var sort = $stateParams.sort.split(',');
			vm.sort = {
				field: sort[0],
				direction: sort[1]
			};
		};

		function onError(error) {
			AlertService.addError(error.statusText);
		};
	}

	vm.sortByField = function (field) {
		if (vm.sort.field == field) {
			vm.sort.direction = (vm.sort.direction == 'desc') ? 'asc' : 'desc';
		} else {
			vm.sort.field = field;
			vm.sort.direction = 'asc';
		}
		vm.reload();
	}

	$scope.$on('$locationChangeSuccess', function() {
		if ($location.path() == '/divisions') {
			vm.getData();
		}
	});

	vm.getData();
});
