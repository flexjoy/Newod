'use strict';

app.controller('DivisionController', function ($scope, Division, ToastService, $uibModal, ngTableParams,
											   ngTableService) {
	var vm = this;
	vm.enabled_select = ngTableService.GetEnabledSelect();
	vm.toggleFilter = toggleFilter;
	vm.setSelected = setSelected;
	vm.delete = del;
	vm.action = action;

	vm.tp = new ngTableParams({
		page: 1,
		count: 10,
		sorting: { name: 'asc' }
	}, {
		counts: [10,15,25,50],
		filterOptions: { filterDelay: 0 },
		getData: function(params) {

			// reset selected entity
			vm.entity = null;

			// convert ngTable params to backend pagable params
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

	// clear filter if user off the filter and filter value is not empty
	function toggleFilter () {
		var filterProp = Object.keys(vm.tp.filter());
		if (!$scope.showFilter && filterProp.length > 0) {
			vm.tp.filter({});
		}
	}

	// store selected entity for CRUD actions
	function setSelected (entity) {
		vm.entity = entity;
	}

	// delete entity dialog
	function del (entity) {
		$uibModal.open({
			templateUrl: 'entities/division/delete-dialog.html',
			controller: 'DivisionDeleteController',
			controllerAs: 'vm',
			size: 'md',
			resolve: { division: entity }
		})
		.result.then(
			function () {
				ngTableService.ReloadPage(vm.tp);
			}
		);
	}

	// add or update entity dialog
	function action (entity) {
		$uibModal.open({
			templateUrl: 'entities/division/action-dialog.html',
			controller: 'DivisionActionController',
			controllerAs: 'vm',
			size: 'md',
			resolve: { division: entity	}
		})
		.result.then(
			function () {
				ngTableService.ReloadPage(vm.tp);
			}
		);
	}
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.controller('DivisionDeleteController', function ($scope, $uibModalInstance,	division, Division,	ToastService,
													 $filter) {
	var vm = this;
	var $translate = $filter('translate');
	vm.division = division;
	vm.delete = del;
	vm.cancel = cancel;

	// delete division
	function del() {
		Division.delete({ id: division.id }, onSuccess, onError);

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
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.controller('DivisionActionController', function ($scope, $uibModalInstance, division, Division, ToastService,
														  UtilService, $filter) {
	var vm = this;
	var $translate = $filter('translate');

	// if division is null - this is add operation
	var isAddOperation = !division;
	if (isAddOperation) {
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

	// add new division
	function add() {
		Division.save(vm.division, onSuccess, onError);
	}

	// update division
	function update() {
		Division.update({ id: vm.division.id }, vm.division, onSuccess, onError);
	}

	function onSuccess() {
		ToastService.Success(vm.successMessage);
		$uibModalInstance.close();
	}

	function onError(error) {
		if (error.data.status == 400) {
			// HTTP status 400 - validation error. We set server side errors to form fields:
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
