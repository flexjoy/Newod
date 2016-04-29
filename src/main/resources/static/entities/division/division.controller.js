'use strict';

app.controller('DivisionController', function (
	$scope,
	$state,
	$stateParams,
	Division,
	$location,
	ToastService,
	$uibModal,
	$filter) {

	var $translate = $filter('translate');
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
	};

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
		}

		function onError(error) {
			ToastService.Error(error.data.error);
		}
	};

	vm.sortByField = function (field) {
		if (vm.sort.field == field) {
			vm.sort.direction = (vm.sort.direction == 'desc') ? 'asc' : 'desc';
		} else {
			vm.sort.field = field;
			vm.sort.direction = 'asc';
		}
		vm.reload();
	};

	$scope.$on('$locationChangeSuccess', function() {
		if ($location.path() == '/divisions') {
			vm.getData();
		}
	});

	vm.getData();

	vm.delete = function (division) {
		$uibModal
			.open({
				templateUrl: 'entities/division/delete-dialog.html',
				controller: 'DivisionDeleteController',
				controllerAs: 'vm',
				size: 'md',
				resolve: { division: division }
			})
			.result.then(
				function () { vm.getData();	}
			);
	};

	vm.update = function (division) {
		$uibModal
			.open({
				templateUrl: 'entities/division/update-dialog.html',
				controller: 'DivisionUpdateController',
				controllerAs: 'vm',
				size: 'md',
				resolve: { division: division }
			})
			.result.then(
				function () { vm.getData(); }
			);
	};
});

app.controller('DivisionDeleteController', function (
	$scope,
	$uibModalInstance,
	division,
	Division,
	ToastService,
	$filter) {

	var vm = this;
	var $translate = $filter('translate');
	vm.division = division;

	vm.delete = function () {
		Division.delete({id: division.id}, onSuccess, onError);

		function onSuccess() {
			ToastService.Success($translate('TEXT.deleted'));
			$uibModalInstance.close();
		}

		function onError(error) {
			ToastService.Error(error.data.error);
		}
	};

	vm.cancel = function () {
		$uibModalInstance.dismiss('cancel');
	};
});

app.controller('DivisionUpdateController', function (
	$scope,
	$uibModalInstance,
	division,
	Division,
	ToastService,
	$filter) {

	var vm = this;
	var $translate = $filter('translate');
	vm.division = angular.copy(division);

	vm.update = function () {
		Division.update({id: vm.division.id}, vm.division, onSuccess, onError);

		function onSuccess() {
			ToastService.Success($translate('TEXT.updated'));
			$uibModalInstance.close();
		}

		function onError(error) {
			ToastService.Error(error.data.error);
		}
	};

	vm.cancel = function () {
		$uibModalInstance.dismiss('cancel');
	};
});
