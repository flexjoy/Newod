'use strict';

app.controller('DivisionController', function ($scope, $state, $stateParams, Division, $location, ToastService,
											   $uibModal) {

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
		if ($location.path() == '/divisions') {
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
		Division.query(
			{
				page: $stateParams.page - 1,
				size: $stateParams.size,
				sort: $stateParams.sort,
				search: $stateParams.search
			}, onSuccess, onError);

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

	function del(division) {
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
	}

	function action(division) {
		$uibModal
			.open({
				templateUrl: 'entities/division/add-or-update-dialog.html',
				controller: 'DivisionAddOrUpdateController',
				controllerAs: 'vm',
				size: 'md',
				resolve: { division: division }
			})
			.result.then(
				function () { vm.getData(); }
			);
	}
});

app.controller('DivisionDeleteController', function ($scope, $uibModalInstance,	division, Division,	ToastService,
													 $filter) {

	var vm = this;
	var $translate = $filter('translate');
	vm.division = division;
	vm.delete = del;
	vm.cancel = cancel;

	function del() {
		Division.delete({id: division.id}, onSuccess, onError);

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

app.controller('DivisionAddOrUpdateController', function ($scope, $uibModalInstance, division, Division, ToastService,
														  UtilService, $filter) {

	var vm = this;
	var $translate = $filter('translate');

	/**
	 *  If division is null - this is add operation
	 */
	vm.isAdd = !division;

	if (vm.isAdd) {
		vm.division = {enabled: true};
		vm.concreteAction = add;
		vm.successMessage = $translate('TEXT.added');
		vm.actionLabel = $translate('ACTION.add');
	} else {
		vm.division = angular.copy(division);
		vm.concreteAction = update;
		vm.successMessage = $translate('TEXT.updated');
		vm.actionLabel = $translate('ACTION.update');
	}

	vm.action = action;
	vm.cancel = cancel;

	function add() {
		Division.save(vm.division, onSuccess, onError);
	}

	function update() {
		Division.update({id: vm.division.id}, vm.division, onSuccess, onError);
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
