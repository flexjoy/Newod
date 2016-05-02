'use strict';

app.controller('CityController', function ($scope, $state, $stateParams, City, Division, $location, ToastService,
										   $uibModal, $http) {

	var vm = this;
	vm.sizeArray = [10, 20, 30, 50];
	vm.reload = reload;
	vm.getData = getData;
	vm.sortByField = sortByField;
	vm.delete = del;
	vm.action = action;
	vm.clear = clear;
	vm.getData();

	$scope.$on('$locationChangeSuccess', function() {
		if ($location.path() == '/cities') {
			vm.getData();
		}
	});

	function reload() {
		$state.go('.',
			{
				page: vm.page.number,
				size: vm.page.size,
				sort: vm.sort.field + ',' + vm.sort.direction,
				search: vm.search
			}
		);
	}

	function clear() {
		vm.page.number = 1;
		vm.search = null;
		vm.reload();
	}

	function getData() {
		City.query(
			{
				page: $stateParams.page - 1,
				size: $stateParams.size,
				sort: $stateParams.sort,
				search: $stateParams.search
			}, onSuccess, onError);

		function onSuccess(data) {
			vm.cities = data.content;
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
			vm.search = $stateParams.search;
		}

		function onError(error) {
			ToastService.Error(error.data.error);
		}
	}

	function sortByField(field) {
		if (vm.sort.field == field) {
			vm.sort.direction = (vm.sort.direction == 'desc') ? 'asc' : 'desc';
		} else {
			vm.sort.field = field;
			vm.sort.direction = 'asc';
		}
		vm.page.number = 1;
		vm.reload();
	}

	function del(city) {
		$uibModal
			.open({
				templateUrl: 'entities/city/delete-dialog.html',
				controller: 'CityDeleteController',
				controllerAs: 'vm',
				size: 'md',
				resolve: { city: city }
			})
			.result.then(
			function () { vm.getData();	}
		);
	}

	function action(city) {
		$uibModal
			.open({
				templateUrl: 'entities/city/add-or-update-dialog.html',
				controller: 'CityAddOrUpdateController',
				controllerAs: 'vm',
				size: 'md',
				resolve: {
					city: city,
					divisions: Division.getAll().$promise
				}
			})
			.result.then(
			function () { vm.getData(); }
		);
	}
});

app.controller('CityDeleteController', function ($scope, $uibModalInstance,	city, City,	ToastService, $filter) {

	var vm = this;
	var $translate = $filter('translate');
	vm.city = city;
	vm.delete = del;
	vm.cancel = cancel;

	function del() {
		City.delete({id: city.id}, onSuccess, onError);

		function onSuccess() {
			ToastService.Success($translate('TEXT.deleted'));
			$uibModalInstance.close();
		}

		function onError(error) {
			ToastService.Error(error.data.error);
		}
	}

	function cancel() {
		$uibModalInstance.dismiss('cancel');
	}
});

app.controller('CityAddOrUpdateController', function ($scope, $uibModalInstance, city, divisions, City, ToastService,
													  UtilService, $filter) {

	var vm = this;
	var $translate = $filter('translate');
	vm.divisions = divisions;

	/**
	 *  If city is null - this is add operation
	 */
	vm.isAdd = !city;

	if (vm.isAdd) {
		vm.city = {enabled: true, division: vm.divisions[0]};
		vm.concreteAction = add;
		vm.successMessage = $translate('TEXT.added');
		vm.actionLabel = $translate('ACTION.add');
	} else {
		vm.city = angular.copy(city);
		vm.concreteAction = update;
		vm.successMessage = $translate('TEXT.updated');
		vm.actionLabel = $translate('ACTION.update');
	}

	vm.action = action;
	vm.cancel = cancel;

	function add() {
		City.save(vm.city, onSuccess, onError);
	}

	function update() {
		City.update({id: vm.city.id}, vm.city, onSuccess, onError);
	}

	function onSuccess() {
		ToastService.Success(vm.successMessage);
		$uibModalInstance.close();
	}

	function onError(error) {
		if (error.data.status == 400) {
			/** HTTP status 400 - validation error.
			 *  We set server side errors to form fields:
			 */
			$scope.errors = UtilService.SetServerErrors($scope.updateForm, error.data.errors);
		} else {
			ToastService.Error(error.data.error);
		}
	}

	function action() {
		vm.concreteAction();
	}

	function cancel() {
		$uibModalInstance.dismiss('cancel');
	}
});
