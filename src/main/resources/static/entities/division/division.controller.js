'use strict';

app.controller('DivisionController', function ($scope, $http, $state, $stateParams, Data) {

	var vm = this;
	vm.divisions = Data.content;
	vm.page = {
		size: 				Data.size,
		number: 			Data.number + 1,
		totalElements: 		Data.totalElements,
		numberOfElements: 	Data.numberOfElements,
		firstIndex:			Data.size * Data.number + 1,
		lastIndex:			Data.size * Data.number + Data.numberOfElements
	};
	var sort = $stateParams.sort.split(',');
	vm.sort = {
		field: sort[0],
		direction: sort[1]
	};

	vm.reload = function () {
		$state.go($state.$current,
			{
				page: vm.page.number,
				sort: vm.sort.field + ',' + vm.sort.direction
			}
		);
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
});
