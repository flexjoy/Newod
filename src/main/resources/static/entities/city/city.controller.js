'use strict';

app.controller('CityController', function ($scope, City, Division, ToastService, $uibModal, ngTableParams,
										   ngTableService, $state, initParams) {
	var vm = this;
	vm.enabled_select = ngTableService.GetEnabledSelect();
	vm.division_select = ngTableService.GetDivisionSelect();
	vm.toggleFilter = toggleFilter;
	vm.setSelected = setSelected;
	vm.delete = del;
	vm.action = action;

	// show filter row if filter parameters are present
	if (initParams.filter) {
		$scope.showFilter = true;
	}

	vm.tp = new ngTableParams( initParams, {
		counts: [10,15,25,50],
		filterOptions: { filterDelay: 0 },
		getData: function(params) {

			// reset selected entity
			vm.entity = null;

			// clear $state.params
			var stateParams = Object.keys($state.params);
			stateParams.forEach(function (key) {
				$state.params[key] = undefined;
			});

			//convert ngTable params to $state.params
			$state.params = angular.extend($state.params, ngTableService.ParametersToStateParams(params));

			return City.get($state.params).$promise.then(
				function(data) {
					params.total(data.totalElements);
					vm.firstRow = (params.page() - 1) * params.count() + 1;
					$state.params.page++;
					$state.go('.', $state.params, { notify: false });
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
			templateUrl: 'partials/delete-dialog.html',
			controller: 'CityDeleteController',
			controllerAs: 'vm',
			size: 'md',
			resolve: { city: entity	}
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
			templateUrl: 'entities/city/action-dialog.html',
			controller: 'CityActionController',
			controllerAs: 'vm',
			size: 'md',
			resolve: {
				city: entity,
				divisions: Division.getAll().$promise
			}
		})
		.result.then(
			function () {
				ngTableService.ReloadPage(vm.tp);
			}
		);
	}
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.controller('CityDeleteController', function ($scope, $uibModalInstance,	city, City,	ToastService, $filter) {

	var vm = this;
	var $translate = $filter('translate');
	vm.entityLabel = city.name;
	vm.delete = del;
	vm.cancel = cancel;

	// delete city
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

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.controller('CityActionController', function ($scope, $uibModalInstance, city, divisions, City, ToastService,
													  UtilService, $filter) {
	var vm = this;
	var $translate = $filter('translate');
	vm.divisions = divisions;

	// if city is null - this is add operation
	var isAddOperation = !city;
	if (isAddOperation) {
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
		City.update({ id: vm.city.id }, vm.city, onSuccess, onError);
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
