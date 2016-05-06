'use strict';

app.controller('DivisionController', function ($scope, $state, $stateParams, Division, $location, ToastService,
											   $uibModal, ngTableParams, $filter) {
	var vm = this;
	var $translate = $filter('translate');
	vm.enabled_select = [
		{ id: "true", 	title: $translate('ENTITY_FIELD.enabled') },
		{ id: "false", 	title: $translate('TEXT.closed') }
	];

	//$scope.showFilter = false;
	vm.toggleFilter = function () {
		//$scope.showFilter = !$scope.showFilter;
		console.log($scope.showFilter);
		if (!$scope.showFilter && Object.keys(vm.tp.filter()).length > 0) {
			vm.tp.filter({});
		}
	}

	vm.tp = new ngTableParams({
		page: 1,
		count: 10,
		sorting: { name: 'asc' }
	}, {
		counts: [10,15,25,50],
		filterOptions: { filterDelay: 0 },
		getData: function(params) {

			vm.entity = null;

			var sortingProp = Object.keys(params.sorting());
			var sort = sortingProp[0] + ',' + params.sorting()[sortingProp[0]];
			var queryParams = {
				page:	params.page() - 1,
				size:	params.count(),
				sort:	sort
			};

			var filterProp = Object.keys(params.filter());
			if (filterProp.length > 0) {
				filterProp.forEach(function (field) {
					queryParams[field] = params.filter()[field];
				})
			}

			return Division.get(queryParams).$promise.then(
				function(data) {
					params.total(data.totalElements);
					vm.firstRow = (params.page() - 1) * params.count() + 1;
					return data.content;
				},
				function (error) {
					ToastService.Error(error.data.error);
				}
			);
		}
	});

	vm.setSelected = function (division) {
		vm.entity = division;
	};

	vm.delete = function () {
		$uibModal
			.open({
				templateUrl: 'entities/division/delete-dialog.html',
				controller: 'DivisionDeleteController',
				controllerAs: 'vm',
				size: 'md',
				resolve: { division: vm.entity }
			})
			.result.then(
				function () { reloadPage();	}
			);
	};

	function reloadPage () {
		vm.tp.reload().then(
			function(data) {
				if (data.length === 0 && vm.tp.total() > 0) {
					vm.tp.page(vm.tp.page() - 1);
					vm.tp.reload();
				}
			},
			function (error) {
				ToastService.Error(error.data.error);
			}
		);
	}

	vm.action = function (data) {
		$uibModal
			.open({
				templateUrl: 'entities/division/add-or-update-dialog.html',
				controller: 'DivisionAddOrUpdateController',
				controllerAs: 'vm',
				size: 'md',
				resolve: {
					division: vm.entity,
					isAdd : data
				}
			})
			.result.then(
				function () { reloadPage();	}
			);
	};
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
														  UtilService, $filter, isAdd) {

	var vm = this;
	var $translate = $filter('translate');

	/**
	 *  If isAdd is true - this is add operation
	 */

	if (isAdd) {
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
